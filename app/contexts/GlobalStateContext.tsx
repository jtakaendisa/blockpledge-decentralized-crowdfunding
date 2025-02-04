'use client';

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { User } from 'firebase/auth';
import { Contract, Listener } from 'ethers';

import {
  AuthUser,
  Category,
  Stats,
  Project,
  ProjectCreatedEvent,
  ProjectUpdatedEvent,
  ProjectTerminatedEvent,
  ProjectBackedEvent,
} from '../entities';
import { StatusEnum } from '../constants';
import { authStateChangeListener, formatAuthUserData } from '../services/authService';
import { areArraysEqual } from '../utils';
import { useBlockchain } from '../hooks/useBlockchain';

interface GlobalStateContextType {
  projects: Project[];
  stats: Stats;
  categories: Category[];
  connectedAccount: string;
  authUser: AuthUser | null;
  isLoadingAuth: boolean;
  error: Error | null;
}

export const GlobalStateContext = createContext<GlobalStateContextType>({
  projects: [],
  stats: {} as Stats,
  categories: [],
  connectedAccount: '',
  authUser: null,
  isLoadingAuth: true,
  error: null,
});

export const GlobalStateProvider = ({ children }: PropsWithChildren) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalProjects: 0,
    totalBackings: 0,
    totalDonations: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [connectedAccount, setConnectedAccount] = useState('');
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const {
    connectWallet,
    getProjects,
    getStats,
    getCategories,
    getContract,
    formatProjectCreatedInfo,
    formatProjectBackingInfo,
  } = useBlockchain();

  const handleProjectCreated: Listener = useCallback(
    (...args) => {
      const event: { args: ProjectCreatedEvent } = args[args.length - 1];
      const newProject = formatProjectCreatedInfo(event.args);

      setProjects((prev) => {
        const foundProject = prev.find((projects) => projects.id === newProject.id);

        return foundProject ? prev : [{ ...newProject, deletionReason: '' }, ...prev];
      });
    },
    [formatProjectCreatedInfo]
  );

  const handleProjectApproved = useCallback(
    (id: bigint) =>
      setProjects((prev) =>
        prev.map((project) =>
          project.id === Number(id) ? { ...project, status: StatusEnum.Open } : project
        )
      ),
    []
  );

  const handleProjectTerminated: Listener = useCallback((...args) => {
    const event: { args: ProjectTerminatedEvent } = args[args.length - 1];
    const { id } = event.args;

    setProjects((prev) => {
      const foundProject = prev.find((project) => project.id === Number(id));

      if (foundProject?.status === StatusEnum.Deleted) {
        return prev;
      }

      return prev.map((project) =>
        project.id === Number(id)
          ? {
              ...project,
              status: StatusEnum.Deleted,
            }
          : project
      );
    });
  }, []);

  const handleProjectUpdated: Listener = useCallback((...args) => {
    const event: { args: ProjectUpdatedEvent } = args[args.length - 1];
    const { id, description, imageUrls } = event.args;

    setProjects((prev) => {
      const foundProject = prev.find((project) => project.id === Number(id));

      if (
        foundProject &&
        foundProject.description === description &&
        areArraysEqual(foundProject.imageUrls, imageUrls)
      ) {
        return prev;
      }

      return prev.map((project) =>
        project.id === Number(id)
          ? {
              ...project,
              description,
              imageUrls,
            }
          : project
      );
    });
  }, []);

  const handleProjectBacked: Listener = useCallback(
    (...args) => {
      const event: { args: ProjectBackedEvent } = args[args.length - 1];
      const backingInfo = formatProjectBackingInfo(event.args);
      const { projectId, raised, totalBackings, totalDonations } = backingInfo;

      setProjects((prev) => {
        const foundProject = prev.find((project) => project.id === projectId);

        if (foundProject?.raised === raised) {
          return prev;
        }

        return prev.map((project) =>
          project.id === projectId
            ? {
                ...project,
                raised,
              }
            : project
        );
      });

      setStats((prev) => {
        if (
          prev.totalBackings === totalBackings &&
          prev.totalDonations === totalDonations
        ) {
          return prev;
        }

        return {
          ...prev,
          totalBackings,
          totalDonations,
        };
      });
    },
    [formatProjectBackingInfo]
  );

  const handleProjectPaidOut = useCallback(
    (id: bigint) =>
      setProjects((prev) => {
        const foundProject = prev.find((project) => project.id === Number(id));

        if (foundProject?.status === StatusEnum.PaidOut) {
          return prev;
        }

        return prev.map((project) =>
          project.id === Number(id)
            ? { ...project, status: StatusEnum.PaidOut }
            : project
        );
      }),
    []
  );

  useEffect(() => {
    let contract: Contract | undefined;

    const init = async () => {
      try {
        contract = await getContract();

        // Fetch initial data
        const { projects } = await getProjects();
        const { stats } = await getStats();
        const { categories } = await getCategories();

        setProjects(projects);
        setStats(stats);
        setCategories(categories);

        // Set up event listeners
        contract.on('ProjectCreated', handleProjectCreated);
        contract.on('ProjectApproved', handleProjectApproved);
        contract.on('ProjectRejected', handleProjectTerminated);
        contract.on('ProjectDeleted', handleProjectTerminated);
        contract.on('ProjectUpdated', handleProjectUpdated);
        contract.on('ProjectBacked', handleProjectBacked);
        contract.on('ProjectPaidOut', handleProjectPaidOut);
      } catch (error) {
        setError(error as Error);
      }
    };

    init();

    // Clean up event listeners on unmount
    return () => {
      if (contract) {
        contract.off('ProjectCreated', handleProjectCreated);
        contract.off('ProjectApproved', handleProjectApproved);
        contract.off('ProjectRejected', handleProjectTerminated);
        contract.off('ProjectDeleted', handleProjectTerminated);
        contract.off('ProjectUpdated', handleProjectUpdated);
        contract.off('ProjectBacked', handleProjectBacked);
        contract.off('ProjectPaidOut', handleProjectPaidOut);
      }
    };
  }, [
    getContract,
    getProjects,
    getStats,
    getCategories,
    handleProjectCreated,
    handleProjectUpdated,
    handleProjectTerminated,
    handleProjectBacked,
    handleProjectPaidOut,
    handleProjectApproved,
  ]);

  // Handle wallet address and blockchain network changes
  useEffect(() => {
    const handleWalletConnection = async () => {
      const { accounts } = await connectWallet();

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      }
    };

    const handleChainChange = () => {
      window.location.reload();
    };

    handleWalletConnection();

    window.ethereum.on('accountsChanged', handleWalletConnection);
    window.ethereum.on('chainChanged', handleChainChange);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleWalletConnection);
      window.ethereum.removeListener('chainChanged', handleChainChange);
    };
  }, [connectWallet]);

  // Handle updates to user authentication status
  useEffect(() => {
    const unsubscribe = authStateChangeListener(async (user: User) => {
      setIsLoadingAuth(true);
      const formattedAuthUser = await formatAuthUserData(user);
      setAuthUser(formattedAuthUser);
      setIsLoadingAuth(false);
    });

    return unsubscribe;
  }, []);

  return (
    <GlobalStateContext.Provider
      value={{
        projects,
        stats,
        categories,
        connectedAccount,
        authUser,
        isLoadingAuth,
        error,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

'use client';

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { User } from 'firebase/auth';
import { Contract } from 'ethers';

import { AuthUser, Category, Project, Stats } from '../entities';
import { StatusEnum } from '../constants';
import { authStateChangeListener, formatAuthUserData } from '../services/authService';
import { useBlockchain } from '../hooks/useBlockchain';
import { useEmail } from '../hooks/useEmail';

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
    formatProjectPayoutInfo,
  } = useBlockchain();

  const { sendPaymentNotification } = useEmail();

  const handleProjectCreated = useCallback(
    (
      id: bigint,
      owner: string,
      title: string,
      description: string,
      imageUrls: string[],
      categoryId: bigint,
      cost: bigint,
      raised: bigint,
      createdAt: bigint,
      expiresAt: bigint,
      backers: bigint,
      status: bigint
    ) => {
      const newProject = formatProjectCreatedInfo(
        id,
        owner,
        title,
        description,
        imageUrls,
        categoryId,
        cost,
        raised,
        createdAt,
        expiresAt,
        backers,
        status
      );

      setProjects((prev) => [{ ...newProject, deletionReason: '' }, ...prev]);
    },
    [formatProjectCreatedInfo]
  );

  const handleProjectUpdated = useCallback(
    (id: bigint, description: string, imageUrls: string[]) => {
      setProjects((prev) =>
        prev.map((project) =>
          project.id === Number(id)
            ? {
                ...project,
                description,
                imageUrls,
              }
            : project
        )
      );
    },
    []
  );

  const handleProjectTerminated = useCallback((id: bigint) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === Number(id)
          ? {
              ...project,
              status: StatusEnum.Deleted,
            }
          : project
      )
    );
  }, []);

  const handleProjectBacked = useCallback(
    (
      id: bigint,
      backer: string,
      contribution: bigint,
      comment: string,
      timestamp: bigint
    ) => {
      const backingInfo = formatProjectBackingInfo(
        id,
        backer,
        contribution,
        comment,
        timestamp
      );

      setProjects((prev) =>
        prev.map((project) =>
          project.id === backingInfo.id
            ? {
                ...project,
                raised: project.raised + backingInfo.contribution,
              }
            : project
        )
      );

      setStats((prev) => ({
        ...prev,
        totalBackings: prev.totalBackings + 1,
        totalDonations: prev.totalDonations + backingInfo.contribution,
      }));
    },
    [formatProjectBackingInfo]
  );

  const handleProjectPaidOut = useCallback(
    async (
      id: bigint,
      title: string,
      recipient: string,
      amount: bigint,
      timestamp: bigint
    ) => {
      const payoutInfo = formatProjectPayoutInfo(
        id,
        title,
        recipient,
        amount,
        timestamp
      );
      await sendPaymentNotification(payoutInfo);

      setProjects((prev) =>
        prev.map((project) =>
          project.id === payoutInfo.id
            ? { ...project, status: StatusEnum.PaidOut }
            : project
        )
      );
    },
    [formatProjectPayoutInfo, sendPaymentNotification]
  );

  const handleProjectApproved = useCallback((id: bigint) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === Number(id) ? { ...project, status: StatusEnum.Open } : project
      )
    );
  }, []);

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
        contract.on('ProjectUpdated', handleProjectUpdated);
        contract.on('ProjectDeleted', handleProjectTerminated);
        contract.on('ProjectBacked', handleProjectBacked);
        contract.on('ProjectPaidOut', handleProjectPaidOut);
        contract.on('ProjectApproved', handleProjectApproved);
        contract.on('ProjectRejected', handleProjectTerminated);
      } catch (error) {
        setError(error as Error);
      }
    };

    init();

    // Clean up event listeners on unmount
    return () => {
      if (contract) {
        contract.off('ProjectCreated', handleProjectCreated);
        contract.off('ProjectUpdated', handleProjectUpdated);
        contract.off('ProjectDeleted', handleProjectTerminated);
        contract.off('ProjectBacked', handleProjectBacked);
        contract.off('ProjectPaidOut', handleProjectPaidOut);
        contract.off('ProjectApproved', handleProjectApproved);
        contract.off('ProjectRejected', handleProjectTerminated);
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

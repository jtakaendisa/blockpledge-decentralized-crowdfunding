'use client';

import { createContext, PropsWithChildren, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { AuthUser, Category, Project, Stats } from '../entities';
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
    formatPayoutInfo,
  } = useBlockchain();

  const { sendPaymentNotification } = useEmail();

  // Initialize client state
  useEffect(() => {
    const initialize = async () => {
      try {
        const { projects } = await getProjects();
        const { stats } = await getStats();
        const { categories } = await getCategories();

        setProjects(projects);
        setStats(stats);
        setCategories(categories);
      } catch (error) {
        setError(error as Error);
      }
    };

    initialize();
  }, [getCategories, getProjects, getStats]);

  // Listen for emitted smart contract events and update the client state accordingly
  useEffect(() => {
    const listenForEvents = async () => {
      const contract = await getContract();

      // contract.on('ProjectCreated', (...args) =>
      //   console.log('ProjectCreated', ...args)
      // );
      // contract.on('ProjectUpdated', (...args) =>
      //   console.log('ProjectUpdated', ...args)
      // );
      // contract.on('ProjectDeleted', (...args) =>
      //   console.log('ProjectDeleted', ...args)
      // );
      // contract.on('ProjectBacked', (...args) => console.log('ProjectBacked', ...args));
      // contract.on('ProjectApproved', (...args) =>
      //   console.log('ProjectApproved', ...args)
      // );
      // contract.on('ProjectRejected', (...args) =>
      //   console.log('ProjectRejected', ...args)
      // );

      contract.on('ProjectPaidOut', async (id, title, recipient, amount, timestamp) => {
        const formattedPayoutInfo = formatPayoutInfo(
          id,
          title,
          recipient,
          amount,
          timestamp
        );
        await sendPaymentNotification(formattedPayoutInfo);
      });

      return async () => {
        await contract.removeAllListeners();
      };
    };

    const unsubscribe = listenForEvents();

    return () => {
      unsubscribe.then(async (cleanup) => await cleanup());
    };
  }, [getContract, formatPayoutInfo, sendPaymentNotification]);

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

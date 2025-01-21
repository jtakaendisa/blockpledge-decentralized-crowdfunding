'use client';

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { User } from 'firebase/auth';

import { AuthUser, Category, Project, Stats } from '../entities';
import { authStateChangeListener, formatAuthUserData } from '../services/authService';
import { useBlockchain } from '../hooks/useBlockchain';

interface GlobalStateContextType {
  projects: Project[];
  stats: Stats;
  categories: Category[];
  connectedAccount: string;
  authUser: AuthUser | null;
  isLoadingAuth: boolean;
  error: Error | null;
  handleWalletConnection: () => void;
}

export const GlobalStateContext = createContext<GlobalStateContextType>({
  projects: [],
  stats: {} as Stats,
  categories: [],
  connectedAccount: '',
  authUser: null,
  isLoadingAuth: true,
  error: null,
  handleWalletConnection: () => {},
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

  const { getProjects, getStats, getCategories, connectWallet } = useBlockchain();

  const handleWalletConnection = useCallback(async () => {
    const { accounts } = await connectWallet();

    if (accounts.length) {
      setConnectedAccount(accounts[0]);
    }
  }, [connectWallet, setConnectedAccount]);

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
        handleWalletConnection,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

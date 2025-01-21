'use client';

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { Category, Project, Stats } from '../entities';
import { useBlockchain } from '../hooks/useBlockchain';

interface GlobalStateContextType {
  projects: Project[];
  stats: Stats;
  categories: Category[];
  error: Error | null;
}

export const GlobalStateContext = createContext<GlobalStateContextType>({
  projects: [],
  stats: {} as Stats,
  categories: [],
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
  const [error, setError] = useState<Error | null>(null);

  const { getProjects, getStats, getCategories } = useBlockchain();

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

  return (
    <GlobalStateContext.Provider
      value={{
        projects,
        stats,
        categories,
        error,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

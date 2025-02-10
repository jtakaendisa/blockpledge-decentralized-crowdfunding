'use client';

import { createContext, PropsWithChildren, useEffect, useRef, useState } from 'react';

import { Project } from '../entities';
import { useGlobalStateContext } from '../hooks/useGlobalStateContext';
import { usePlaiceholder } from '../hooks/usePlaiceholder';

interface FeaturedProjectsContextType {
  isLoading: boolean;
  projects: Project[];
  blurDataUrls: string[];
  totalPages: number;
  chunkSize: number;
}

const TOTAL_PAGES = 3;
const CHUNK_SIZE = 4;

export const FeaturedProjectsContext = createContext<FeaturedProjectsContextType>({
  isLoading: true,
  projects: [],
  blurDataUrls: [],
  totalPages: TOTAL_PAGES,
  chunkSize: CHUNK_SIZE,
});

export const FeaturedProjectsProvider = ({ children }: PropsWithChildren) => {
  const { projects } = useGlobalStateContext();
  const [blurDataUrls, setBlurDataUrls] = useState<string[]>([]);

  const { getBlurDataUrls } = usePlaiceholder();

  const isLoading = !projects.length || !blurDataUrls.length;

  useEffect(() => {
    const fetchData = async () => {
      const imageUrls = projects
        .slice(0, TOTAL_PAGES * CHUNK_SIZE + 1)
        .map((project) => project.imageUrls[0]);

      const { blurDataUrls } = await getBlurDataUrls(imageUrls);

      setBlurDataUrls(blurDataUrls);
    };

    if (projects.length) {
      fetchData();
    }
  }, [projects, getBlurDataUrls]);

  return (
    <FeaturedProjectsContext.Provider
      value={{
        isLoading,
        projects,
        blurDataUrls,
        totalPages: TOTAL_PAGES,
        chunkSize: CHUNK_SIZE,
      }}
    >
      {children}
    </FeaturedProjectsContext.Provider>
  );
};

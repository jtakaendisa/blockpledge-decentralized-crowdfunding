import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';

import { Project } from '@/app/entities';
import { debounce } from '@/app/utils';

interface FastContextSelectedCategoryId {
  get: number | null;
  set: (value: number | null) => void;
}

interface FastContextSearchQuery {
  get: string;
  set: (value: string) => void;
}

const INCREMENT_SIZE = 5;

export const useProjectsGrid = (
  projects: Project[],
  selectedCategoryId: FastContextSelectedCategoryId,
  containerRef: RefObject<HTMLDivElement>,
  searchQuery: FastContextSearchQuery,
  initialListSize: number
) => {
  const [listSize, setListSize] = useState(initialListSize);

  const increaseListSize = useCallback(
    () => setListSize((prev) => prev + INCREMENT_SIZE),
    []
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategoryId.get == null || project.categoryId === selectedCategoryId.get;

      const matchesSearchQuery = project.title
        .toLowerCase()
        .includes(searchQuery.get.toLowerCase());

      return matchesCategory && matchesSearchQuery;
    });
  }, [projects, searchQuery.get, selectedCategoryId.get]);

  const visibleProjects = filteredProjects.slice(0, listSize);

  const shouldShowMoreProjects = visibleProjects.length < filteredProjects.length;

  useEffect(() => {
    const container = containerRef.current;

    const handleResize = debounce(() => {
      if (!container) return;

      const { width } = container.getBoundingClientRect();
      const cardsPerRow = width >= 1335 ? 5 : width >= 1052 ? 4 : width >= 786 ? 3 : 2;

      container.style.setProperty('--cards-per-row', cardsPerRow.toString());
    }, 350);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  useEffect(() => {
    setListSize(initialListSize);
  }, [initialListSize, selectedCategoryId.get, searchQuery.get]);

  return { visibleProjects, shouldShowMoreProjects, increaseListSize };
};

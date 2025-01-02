import { RefObject, useEffect, useMemo, useState } from 'react';

import { Project } from '@/app/entities';
import { debounce } from '@/app/utils';

type SearchQuery = {
  get: string;
  set: (value: string) => void;
};

const INCREMENT_SIZE = 5;

export const useProjectsGrid = (
  projects: Project[],
  selectedCategoryId: number | null,
  containerRef: RefObject<HTMLDivElement>,
  searchQuery: SearchQuery,
  initialListSize: number
) => {
  const [listSize, setListSize] = useState(initialListSize);

  const increaseListSize = () => setListSize((prev) => prev + INCREMENT_SIZE);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategoryId == null || project.categoryId === selectedCategoryId;

      const matchesSearchQuery = project.title
        .toLowerCase()
        .includes(searchQuery.get.toLowerCase());

      return matchesCategory && matchesSearchQuery;
    });
  }, [projects, searchQuery.get, selectedCategoryId]);

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

  const visibleProjects = filteredProjects.slice(0, listSize);

  useEffect(() => {
    setListSize(initialListSize);
  }, [initialListSize, selectedCategoryId, searchQuery.get]);

  return { filteredProjects, visibleProjects, listSize, increaseListSize };
};

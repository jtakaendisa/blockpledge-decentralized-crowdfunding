import { RefObject, useCallback, useEffect, useMemo, useState } from 'react';

import { useGlobalStateContext } from '@/app/hooks/useGlobalStateContext';
import { useProjectsPageContext } from '@/app/hooks/useProjectsPageContext';
import { debounce } from '@/app/utils';

const INCREMENT_SIZE = 10;

export const useProjectsGrid = (
  containerRef: RefObject<HTMLDivElement>,
  initialListSize: number
) => {
  const { projects } = useGlobalStateContext();

  const { searchQuery, selectedCategoryId } = useProjectsPageContext();

  const [listSize, setListSize] = useState(initialListSize);

  const increaseListSize = useCallback(
    () => setListSize((prev) => prev + INCREMENT_SIZE),
    []
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategoryId == null || project.categoryId === selectedCategoryId;

      const matchesSearchQuery = project.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearchQuery;
    });
  }, [projects, searchQuery, selectedCategoryId]);

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
  }, [initialListSize, selectedCategoryId, searchQuery]);

  return { projects, visibleProjects, shouldShowMoreProjects, increaseListSize };
};

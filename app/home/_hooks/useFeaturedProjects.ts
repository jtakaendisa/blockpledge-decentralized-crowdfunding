import { useEffect } from 'react';

import { useGlobalStateContext } from '@/app/hooks/useGlobalStateContext';
import { useFeaturedProjectsContext } from '@/app/hooks/useFeaturedProjectsContext';
import { usePlaiceholder } from '@/app/hooks/usePlaiceholder';

export const useFeaturedProjects = (totalPages: number, chunkSize: number) => {
  const { projects } = useGlobalStateContext();
  const { blurDataUrls, updateBlurDataUrls } = useFeaturedProjectsContext();

  const { getBlurDataUrls } = usePlaiceholder();

  const isLoading = !projects.length || !blurDataUrls.length;

  useEffect(() => {
    const fetchData = async () => {
      const imageUrls = projects
        .slice(0, totalPages * chunkSize + 1)
        .map((project) => project.imageUrls[0]);

      const { blurDataUrls } = await getBlurDataUrls(imageUrls);

      updateBlurDataUrls(blurDataUrls);
    };

    if (projects.length) {
      fetchData();
    }
  }, [projects, totalPages, chunkSize, getBlurDataUrls, updateBlurDataUrls]);

  return { isLoading, projects, blurDataUrls };
};

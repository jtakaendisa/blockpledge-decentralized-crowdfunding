import { useEffect } from 'react';

import { useProjectStore } from '@/app/store';
import { useFeaturedProjectsContext } from '@/app/hooks/useFeaturedProjectsContext';
import { usePlaiceholder } from '@/app/hooks/usePlaiceholder';

export const useFeaturedProjects = (totalPages: number, chunkSize: number) => {
  const projects = useProjectStore((s) => s.projects);
  const { blurDataUrls, updateBlurDataUrls } = useFeaturedProjectsContext();

  const { getBlurDataURLs } = usePlaiceholder();

  const isLoading = !projects.length || !blurDataUrls.length;

  useEffect(() => {
    const fetchData = async () => {
      const imageUrls = projects
        .slice(0, totalPages * chunkSize + 1)
        .map((project) => project.imageURLs[0]);

      const { blurDataURLs } = await getBlurDataURLs(imageUrls);

      updateBlurDataUrls(blurDataURLs);
    };

    if (projects.length) {
      fetchData();
    }
  }, [projects, totalPages, chunkSize, getBlurDataURLs, updateBlurDataUrls]);

  return { isLoading, projects, blurDataUrls };
};

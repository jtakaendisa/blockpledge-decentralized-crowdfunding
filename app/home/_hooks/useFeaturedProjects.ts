import { useEffect } from 'react';

import { Project } from '@/app/store';
import { useBlurDataURLs } from '@/app/hooks/useBlurDataURLs';
import { useFeaturedProjectsState } from '@/app/contexts/FeaturedProjectsContext';

export const useFeaturedProjects = (
  projects: Project[],
  totalPages: number,
  chunkSize: number
) => {
  const { blurDataURLs } = useFeaturedProjectsState(['blurDataURLs']);
  const { getBlurDataURLs } = useBlurDataURLs();

  const isLoading = !projects.length || !blurDataURLs.get.length;

  useEffect(() => {
    const fetchData = async () => {
      const imageUrls = projects
        .slice(0, totalPages * chunkSize + 1)
        .map((project) => project.imageURLs[0]);

      const { blurDataURLs: bdURLs } = await getBlurDataURLs(imageUrls);

      blurDataURLs.set(bdURLs);
    };

    if (projects.length) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, totalPages, chunkSize, getBlurDataURLs]);

  return { isLoading, blurDataURLs: blurDataURLs.get };
};

import { useEffect } from 'react';

import { Project } from '@/app/entities';
import { usePlaiceholder } from '@/app/hooks/usePlaiceholder';

interface FastContextBlurDataURLs {
  get: string[];
  set: (value: string[]) => void;
}

export const useFeaturedProjects = (
  projects: Project[],
  blurDataURLs: FastContextBlurDataURLs,
  totalPages: number,
  chunkSize: number
) => {
  const { getBlurDataURLs } = usePlaiceholder();

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

  return { isLoading };
};

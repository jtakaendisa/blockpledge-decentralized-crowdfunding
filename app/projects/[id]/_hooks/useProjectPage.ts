import { useEffect, useState } from 'react';

import { useProjectPageContext } from '@/app/hooks/useProjectPageContext';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { usePlaiceholder } from '@/app/hooks/usePlaiceholder';
import { useBlockchainEventListener } from '@/app/hooks/useBlockchainEventListener';

export const useProjectPage = (id: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { updateProject, updateBackers, updateBlurDataUrls } = useProjectPageContext();
  const { getProject, getBackers } = useBlockchain();
  const { getBlurDataURLs } = usePlaiceholder();
  const { updates } = useBlockchainEventListener();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { project } = await getProject(+id);
        const { backers } = await getBackers(+id);
        const { blurDataURLs } = await getBlurDataURLs(project.imageURLs);

        updateProject(project);
        updateBackers(backers);
        updateBlurDataUrls(blurDataURLs);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [
    id,
    updates,
    getProject,
    getBackers,
    getBlurDataURLs,
    updateProject,
    updateBackers,
    updateBlurDataUrls,
  ]);

  return { isLoading, error };
};

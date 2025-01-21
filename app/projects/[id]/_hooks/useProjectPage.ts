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
  const { getBlurDataUrls } = usePlaiceholder();
  const { updates } = useBlockchainEventListener();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { project } = await getProject(+id);
        const { backers } = await getBackers(+id);
        const { blurDataUrls } = await getBlurDataUrls(project.imageUrls);

        updateProject(project);
        updateBackers(backers);
        updateBlurDataUrls(blurDataUrls);
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
    getBlurDataUrls,
    updateProject,
    updateBackers,
    updateBlurDataUrls,
  ]);

  return { isLoading, error };
};

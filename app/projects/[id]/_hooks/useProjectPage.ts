import { useEffect, useState } from 'react';

import { Backer, Project } from '@/app/entities';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { usePlaiceholder } from '@/app/hooks/usePlaiceholder';

interface FastContextProject {
  get: Project;
  set: (value: Project) => void;
}

interface FastContextBackers {
  get: Backer[];
  set: (value: Backer[]) => void;
}

interface FastContextBlurDataURLs {
  get: string[];
  set: (value: string[]) => void;
}

export const useProjectPage = (
  id: string,
  project: FastContextProject,
  backers: FastContextBackers,
  blurDataURLs: FastContextBlurDataURLs,
  updates: number
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const { getProject, getBackers } = useBlockchain();
  const { getBlurDataURLs } = usePlaiceholder();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { project: fetchedProject } = await getProject(+id);
        const { backers: fetchedBackers } = await getBackers(+id);
        const { blurDataURLs: fetchedBlurDataURLs } = await getBlurDataURLs(
          fetchedProject.imageURLs
        );

        project.set(fetchedProject);
        backers.set(fetchedBackers);
        blurDataURLs.set(fetchedBlurDataURLs);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, updates, getProject, getBackers, getBlurDataURLs]);

  return { isLoading, project, backers, blurDataURLs, error };
};

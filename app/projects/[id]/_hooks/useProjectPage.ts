import { useEffect, useState } from 'react';

import { Backer, Project } from '@/app/entities';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { usePlaiceholder } from '@/app/hooks/usePlaiceholder';

interface FastContextProject {
  get: Project | null;
  set: (value: Project | null) => void;
}

interface FastContextBackers {
  get: Backer[] | null;
  set: (value: Backer[] | null) => void;
}

interface FastContextBlurDataURLs {
  get: string[] | null;
  set: (value: string[] | null) => void;
}

export const useProjectPage = (
  id: string,
  project: FastContextProject,
  backers: FastContextBackers,
  blurDataURLs: FastContextBlurDataURLs,
  updates: number
) => {
  const [error, setError] = useState<Error | null>(null);

  const { getProject, getBackers } = useBlockchain();
  const { getBlurDataURLs } = usePlaiceholder();

  const isLoading = !project.get || !backers.get || !blurDataURLs.get;

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
      }
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, updates, getProject, getBackers, getBlurDataURLs]);

  return { isLoading, project, backers, blurDataURLs, error };
};

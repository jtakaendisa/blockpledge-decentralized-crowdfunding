import { useEffect, useState } from 'react';

import { Backer, Project } from '@/app/store';
import { useBlockchain } from '@/app/hooks/useBlockchain';
import { useBlurDataURLs } from '@/app/hooks/useBlurDataURLs';

export const useProjectPage = (id: string, updates: number) => {
  const [project, setProject] = useState<Project | null>(null);
  const [backers, setBackers] = useState<Backer[] | null>(null);
  const [blurDataURLs, setBlurDataURLs] = useState<string[] | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { getProject, getBackers, getCategories } = useBlockchain();
  const { getBlurDataURLs } = useBlurDataURLs();

  const isLoading = !project || !backers || !blurDataURLs;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { project } = await getProject(+id);
        const { backers } = await getBackers(+id);
        const { blurDataURLs } = await getBlurDataURLs(project.imageURLs);

        setProject(project);
        setBackers(backers);
        setBlurDataURLs(blurDataURLs);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [id, updates, getProject, getBackers, getCategories, getBlurDataURLs]);

  return { isLoading, project, backers, blurDataURLs, error };
};

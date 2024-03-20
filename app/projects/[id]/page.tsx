'use client';

import { useCallback, useEffect, useState } from 'react';

import { Backer, Project } from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
import Header from '@/app/components/Header/Header';
import ProjectDetails from './_components/ProjectDetails/ProjectDetails';
import ProjectBackers from './_components/ProjectBackers/ProjectBackers';

import styles from './page.module.scss';

interface Props {
  params: {
    id: string;
  };
}

const ProjectPage = ({ params: { id } }: Props) => {
  const [project, setProject] = useState<Project | null>(null);
  const [backers, setBackers] = useState<Backer[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const { getProject, getBackers } = useBlockchain();

  const fetchData = useCallback(async () => {
    try {
      const { project } = await getProject(+id);
      const { backers } = await getBackers(+id);

      setProject(project);
      setBackers(backers);
    } catch (error) {
      setError(error as Error);
    }
  }, [getProject, getBackers, id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.projectPage}>
      <Header />
      {project && <ProjectDetails project={project} />}
      {backers && <ProjectBackers backers={backers} />}
    </div>
  );
};

export default ProjectPage;

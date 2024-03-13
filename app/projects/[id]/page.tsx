'use client';

import { useEffect } from 'react';

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
  const { loadProject, getBackers } = useBlockchain();

  useEffect(() => {
    const fetchData = async () => {
      await loadProject(+id);
      await getBackers(+id);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className={styles.projectPage}>
      <Header />
      <ProjectDetails />
      <ProjectBackers />
    </div>
  );
};

export default ProjectPage;

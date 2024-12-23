'use client';

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { Backer, Project, useProjectStore } from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
import ProjectDetails from './_components/ProjectDetails/ProjectDetails';
import InfoSelector from './_components/InfoSelector/InfoSelector';
import ProjectBackers from './_components/ProjectBackers/ProjectBackers';
import ProjectComments from './_components/ProjectComments/ProjectComments';
import ProjectDetailsSkeleton from './_components/ProjectDetailsSkeleton/ProjectDetailsSkeleton';

import styles from './page.module.scss';

interface Props {
  params: {
    id: string;
  };
}

export type Info = 'donations' | 'comments';

const ProjectPage = ({ params: { id } }: Props) => {
  const categories = useProjectStore((s) => s.categories);
  const { getProject, getBackers, getCategories, listenForEvents } = useBlockchain();
  const [project, setProject] = useState<Project | null>(null);
  const [backers, setBackers] = useState<Backer[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [selectedInfo, setSelectedInfo] = useState<Info>('donations');
  const [refreshUi, setRefreshUi] = useState(false);

  const handleSelectInfo = (selection: Info) => {
    setSelectedInfo(selection);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { project } = await getProject(+id);
        const { backers } = await getBackers(+id);

        setProject(project);
        setBackers(backers);
      } catch (error) {
        setError(error as Error);
      }
    };

    fetchData();
  }, [id, refreshUi, getProject, getBackers, getCategories]);

  useEffect(() => {
    const unsubscribe = listenForEvents(() => setRefreshUi((prev) => !prev));
    ('');
    return () => {
      unsubscribe.then((cleanup) => cleanup());
    };
  }, [listenForEvents]);

  if (error) return <div>{error.message}</div>;

  if (!project) return null;

  return (
    <div className={styles.projectPage}>
      <ProjectDetails project={project} categories={categories} />

      {/* <InfoSelector onSelectInfo={handleSelectInfo} selectedInfo={selectedInfo}>
            {selectedInfo === 'donations' && (
              <ProjectBackers backers={backers} project={project} />
            )}
            {selectedInfo === 'comments' && <ProjectComments backers={backers} />}
          </InfoSelector> */}
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="dark"
        hideProgressBar
      />
    </div>
  );
};

export default ProjectPage;

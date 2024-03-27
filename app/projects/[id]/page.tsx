'use client';

import { useEffect, useState } from 'react';

import { Backer, Project, useProjectStore } from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
import Header from '@/app/components/Header/Header';
import ProjectDetails from './_components/ProjectDetails/ProjectDetails';
import InfoSelector from './_components/InfoSelector/InfoSelector';
import ProjectBackers from './_components/ProjectBackers/ProjectBackers';
import ProjectComments from './_components/ProjectComments/ProjectComments';

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
  const [refreshAuthUserData, setRefreshAuthUserData] = useState(false);

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

    return () => {
      unsubscribe.then((cleanup) => cleanup());
    };
  }, [listenForEvents]);

  console.log('project');

  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.projectPage}>
      <Header refreshAuthUserData={refreshAuthUserData} />
      {project && categories && (
        <ProjectDetails
          project={project}
          categories={categories}
          updateFollowingStatus={() => setRefreshAuthUserData((prev) => !prev)}
        />
      )}
      <InfoSelector onSelectInfo={handleSelectInfo} selectedInfo={selectedInfo}>
        {selectedInfo === 'donations' && (
          <ProjectBackers backers={backers} project={project} />
        )}
        {selectedInfo === 'comments' && <ProjectComments backers={backers} />}
      </InfoSelector>
    </div>
  );
};

export default ProjectPage;

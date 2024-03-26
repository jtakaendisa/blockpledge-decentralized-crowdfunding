'use client';

import { useEffect, useState } from 'react';

import { Backer, Project, useProjectStore } from '@/app/store';
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
  const categories = useProjectStore((s) => s.categories);
  const { getProject, getBackers, getCategories, listenForEvents } = useBlockchain();
  const [project, setProject] = useState<Project | null>(null);
  const [backers, setBackers] = useState<Backer[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [refreshUi, setRefreshUi] = useState(false);
  const [refreshAuthUserData, setRefreshAuthUserData] = useState(false);

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
      {/* {backers.length > 0 && <ProjectBackers backers={backers} />} */}
    </div>
  );
};

export default ProjectPage;

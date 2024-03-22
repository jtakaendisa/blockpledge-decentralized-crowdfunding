'use client';

import { useEffect, useState } from 'react';

import { Backer, Category, Project } from '@/app/store';
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [refreshUi, setRefreshUi] = useState(false);
  const { getProject, getBackers, getCategories, listenForEvents } = useBlockchain();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { project } = await getProject(+id);
        const { backers } = await getBackers(+id);
        const { categories } = await getCategories();

        setProject(project);
        setBackers(backers);
        setCategories(categories);
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
      <Header refreshUi={refreshUi} />
      {project && categories && (
        <ProjectDetails
          project={project}
          categories={categories}
          updateFollowingStatus={() => setRefreshUi((prev) => !prev)}
        />
      )}
      {backers && <ProjectBackers backers={backers} />}
    </div>
  );
};

export default ProjectPage;

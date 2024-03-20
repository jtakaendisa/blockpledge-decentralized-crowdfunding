'use client';

import { useCallback, useEffect, useState } from 'react';

import useBlockchain from '../hooks/useBlockchain';
import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';
import CategorySidebar from './_components/CategorySidebar/CategorySidebar';
import SearchInput from './_components/SearchInput/SearchInput';

import styles from './page.module.scss';

const ProjectsPage = () => {
  const { loadProjects } = useBlockchain();
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const { projects } = await loadProjects();
      setProjects(projects);
    } catch (error) {
      setError(error as Error);
    }
  }, [loadProjects]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.browseProjectsPage}>
      <Header />
      <div className={styles.mainContent}>
        <CategorySidebar />
        <div className={styles.projectsSection}>
          <SearchInput />
          <ProjectsGrid projects={projects} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

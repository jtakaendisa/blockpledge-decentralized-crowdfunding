'use client';

import { useEffect } from 'react';

import useBlockchain from '../hooks/useBlockchain';
import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';
import CategorySidebar from './_components/CategorySidebar/CategorySidebar';

import styles from './page.module.scss';

const BrowseProjectsPage = () => {
  const { loadProjects } = useBlockchain();

  useEffect(() => {
    const fetchData = async () => {
      await loadProjects();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.browseProjectsPage}>
      <Header />
      <div className={styles.mainContent}>
        <CategorySidebar />
        <ProjectsGrid />
      </div>
    </div>
  );
};

export default BrowseProjectsPage;

'use client';

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import useBlockchain from './hooks/useBlockchain';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProjectsRow from './components/ProjectsRow/ProjectsRow';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';

import styles from './page.module.scss';

const HomePage = () => {
  const { loadProjects } = useBlockchain();

  useEffect(() => {
    const fetchData = async () => {
      await loadProjects();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.homePage}>
      <Header />
      <Hero />
      <ProjectsRow />
      <CategoriesGrid />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </div>
  );
};

export default HomePage;

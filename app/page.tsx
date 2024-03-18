'use client';

import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import useBlockchain from './hooks/useBlockchain';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProjectsRow from './components/ProjectsRow/ProjectsRow';
import ProjectsGrid from './components/ProjectsGrid/ProjectsGrid';

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
      {/* <ProjectsGrid /> */}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default HomePage;

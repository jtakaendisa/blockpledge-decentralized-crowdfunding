'use client';

import { ToastContainer } from 'react-toastify';

import { useProjectStore } from './store';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProjectsRow from './components/ProjectsRow/ProjectsRow';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';

import styles from './page.module.scss';

const HomePage = () => {
  const projects = useProjectStore((s) => s.projects);
  const stats = useProjectStore((s) => s.stats);
  const categories = useProjectStore((s) => s.categories);

  return (
    <div className={styles.homePage}>
      <Header />
      <Hero stats={stats} />
      <ProjectsRow projects={projects} />
      <CategoriesGrid categories={categories} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        theme="dark"
        hideProgressBar
      />
    </div>
  );
};

export default HomePage;

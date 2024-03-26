'use client';

import { ToastContainer } from 'react-toastify';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProjectsRow from './components/ProjectsRow/ProjectsRow';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';

import styles from './page.module.scss';
import { useProjectStore } from './store';

const HomePage = () => {
  const projects = useProjectStore((s) => s.projects);
  const stats = useProjectStore((s) => s.stats);
  const categories = useProjectStore((s) => s.categories);

  console.log('home');

  return (
    <div className={styles.homePage}>
      <Header />
      <Hero stats={stats} />
      <ProjectsRow projects={projects} />
      <CategoriesGrid categories={categories} />
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        theme="dark"
      />
    </div>
  );
};

export default HomePage;

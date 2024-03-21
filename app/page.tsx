'use client';

import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { useProjectStore } from './store';
import useBlockchain from './hooks/useBlockchain';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProjectsRow from './components/ProjectsRow/ProjectsRow';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';

import styles from './page.module.scss';

const HomePage = () => {
  const projects = useProjectStore((s) => s.projects);
  const stats = useProjectStore((s) => s.stats);
  const categories = useProjectStore((s) => s.categories);
  const setProjects = useProjectStore((s) => s.setProjects);
  const setStats = useProjectStore((s) => s.setStats);
  const setCategories = useProjectStore((s) => s.setCategories);
  const { getProjects, getCategories } = useBlockchain();
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const { projects, stats } = await getProjects();
      const { categories } = await getCategories();

      setProjects(projects);
      setStats(stats);
      setCategories(categories);
    } catch (error) {
      setError(error as Error);
    }
  }, [getProjects, getCategories, setProjects, setStats, setCategories]);

  useEffect(() => {
    if (!projects.length) {
      fetchData();
    }
  }, [projects.length, fetchData]);

  if (error) return <div>{error.message}</div>;

  console.log('render: home');

  return (
    <div className={styles.homePage}>
      <Header />
      <Hero stats={stats} />
      <ProjectsRow projects={projects} />
      <CategoriesGrid categories={categories} />
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

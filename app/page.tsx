'use client';

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';

import { Category, Project } from './store';
import useBlockchain from './hooks/useBlockchain';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProjectsRow from './components/ProjectsRow/ProjectsRow';
import CategoriesGrid from './components/CategoriesGrid/CategoriesGrid';

import styles from './page.module.scss';

const HomePage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState({
    totalBackings: 0,
    totalDonations: 0,
    totalProjects: 0,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [refreshUi, setRefreshUi] = useState(false);
  const { getProjects, getCategories, listenForEvents } = useBlockchain();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { projects, stats } = await getProjects();
        const { categories } = await getCategories();

        setProjects(projects);
        setStats(stats);
        setCategories(categories);
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    fetchData();
  }, [refreshUi, getProjects, getCategories]);

  useEffect(() => {
    const unsubscribe = listenForEvents(() => setRefreshUi((prev) => !prev));

    return () => {
      unsubscribe.then((cleanup) => cleanup());
    };
  }, [listenForEvents]);

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

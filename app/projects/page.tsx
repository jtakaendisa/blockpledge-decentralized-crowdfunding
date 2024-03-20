'use client';

import { useCallback, useEffect, useState } from 'react';

import { useProjectStore } from '../store';
import useBlockchain from '../hooks/useBlockchain';
import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';
import CategorySidebar from './_components/CategorySidebar/CategorySidebar';
import SearchInput from './_components/SearchInput/SearchInput';

import styles from './page.module.scss';

const ProjectsPage = () => {
  const projects = useProjectStore((s) => s.projects);
  const selectedCategory = useProjectStore((s) => s.selectedCategory);
  const categories = useProjectStore((s) => s.categories);
  const setProjects = useProjectStore((s) => s.setProjects);
  const setStats = useProjectStore((s) => s.setStats);
  const setCategories = useProjectStore((s) => s.setCategories);
  const [error, setError] = useState<Error | null>(null);
  const { getProjects, getCategories } = useBlockchain();

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
  }, [fetchData, projects]);

  if (error) return <div>{error.message}</div>;

  return (
    <div className={styles.browseProjectsPage}>
      <Header />
      <div className={styles.mainContent}>
        <CategorySidebar categories={categories} selectedCategory={selectedCategory} />
        <div className={styles.projectsSection}>
          <SearchInput />
          <ProjectsGrid projects={projects} selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;

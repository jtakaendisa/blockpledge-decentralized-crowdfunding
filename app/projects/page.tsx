'use client';

import { useEffect, useState } from 'react';

import { Category, Project, useProjectStore } from '../store';
import useBlockchain from '../hooks/useBlockchain';
import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';
import CategorySidebar from './_components/CategorySidebar/CategorySidebar';
import SearchInput from './_components/SearchInput/SearchInput';

import styles from './page.module.scss';

const ProjectsPage = () => {
  const selectedCategory = useProjectStore((s) => s.selectedCategory);
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const { getProjects, getCategories } = useBlockchain();

  console.log('projects');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { projects } = await getProjects();
        const { categories } = await getCategories();

        setProjects(projects);
        setCategories(categories);
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    fetchData();
  }, [getProjects, getCategories]);

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

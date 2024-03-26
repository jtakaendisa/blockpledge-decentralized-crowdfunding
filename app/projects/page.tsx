'use client';

import { useProjectStore } from '../store';
import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';
import CategorySidebar from './_components/CategorySidebar/CategorySidebar';
import SearchInput from './_components/SearchInput/SearchInput';

import styles from './page.module.scss';

const ProjectsPage = () => {
  const projects = useProjectStore((s) => s.projects);
  const categories = useProjectStore((s) => s.categories);
  const selectedCategory = useProjectStore((s) => s.selectedCategory);

  console.log('projects');

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

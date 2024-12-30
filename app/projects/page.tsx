'use client';

import { useProjectStore } from '../store';
import { Media, MediaContextProvider } from '../media';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';
import CategoriesSidebar from './_components/CategoriesSidebar/CategoriesSidebar';
import SearchInput from './_components/SearchInput/SearchInput';

import styles from './page.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  searchParams: {
    categoryId: string;
  };
}

const ProjectsPage = ({ searchParams: { categoryId } }: Props) => {
  const selectedCategoryId = categoryId ? +categoryId : null;

  const projects = useProjectStore((s) => s.projects);
  const categories = useProjectStore((s) => s.categories);

  return (
    <MediaContextProvider>
      <div className={styles.browseProjectsPage}>
        <div className={styles.mainContent}>
          <Media greaterThanOrEqual="sm">
            <CategoriesSidebar
              categories={categories}
              selectedCategoryId={selectedCategoryId}
            />
          </Media>
          <div className={styles.projectsSection}>
            <div className={styles.searchFilters}>
              <SearchInput projects={projects} />
            </div>
            <ProjectsGrid projects={projects} selectedCategoryId={selectedCategoryId} />
          </div>
        </div>
      </div>
    </MediaContextProvider>
  );
};

export default ProjectsPage;

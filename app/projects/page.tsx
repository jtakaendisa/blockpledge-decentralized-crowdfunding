'use client';

import { useProjectStore } from '../store';
import { Media, MediaContextProvider } from '../media';
import Header from '../components/TopNav/TopNav';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';
import CategoriesSidebar from './_components/CategoriesSidebar/CategoriesSidebar';
import SearchInput from './_components/SearchInput/SearchInput';
import CategoriesDropdown from './_components/CategoriesDropdown/CategoriesDropdown';

import styles from './page.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const ProjectsPage = () => {
  const projects = useProjectStore((s) => s.projects);
  const categories = useProjectStore((s) => s.categories);
  const selectedCategory = useProjectStore((s) => s.selectedCategory);

  return (
    <MediaContextProvider>
      <div className={styles.browseProjectsPage}>
        <Header />
        <div className={styles.mainContent}>
          <Media greaterThanOrEqual="sm">
            <CategoriesSidebar
              categories={categories}
              selectedCategory={selectedCategory}
            />
          </Media>
          <div className={styles.projectsSection}>
            <div className={styles.searchFilters}>
              <SearchInput projects={projects} />
              <Media lessThan="sm">
                <div className={styles.dropdownMenuContainer}>
                  <CategoriesDropdown
                    categories={categories}
                    selectedCategory={selectedCategory}
                  />
                </div>
              </Media>
            </div>
            <ProjectsGrid projects={projects} selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </MediaContextProvider>
  );
};

export default ProjectsPage;

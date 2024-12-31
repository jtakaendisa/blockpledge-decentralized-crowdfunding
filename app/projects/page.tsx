'use client';

import { ProjectsPageProvider } from '../contexts/ProjectsPageContext';
import ProjectFilterPanel from './_components/ProjectFilterPanel/ProjectFilterPanel';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';

import styles from './page.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  searchParams: {
    categoryId: string;
  };
}

const ProjectsPage = ({ searchParams: { categoryId } }: Props) => {
  const selectedCategoryId = categoryId ? +categoryId : null;

  return (
    <div className={styles.projectsPage}>
      <ProjectsPageProvider>
        <ProjectFilterPanel selectedCategoryId={selectedCategoryId} />
        <ProjectsGrid selectedCategoryId={selectedCategoryId} />
      </ProjectsPageProvider>
    </div>
  );
};

export default ProjectsPage;

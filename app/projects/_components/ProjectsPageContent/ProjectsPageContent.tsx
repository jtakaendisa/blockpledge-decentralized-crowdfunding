import { useEffect } from 'react';

import { useProjectsPageState } from '@/app/contexts/ProjectsPageContext';
import ProjectFilterPanel from '../ProjectFilterPanel/ProjectFilterPanel';
import ProjectsGrid from '../ProjectsGrid/ProjectsGrid';

import styles from './ProjectsPageContent.module.scss';

interface Props {
  categoryId: number | null;
}

const ProjectsPageContent = ({ categoryId }: Props) => {
  const { selectedCategoryId } = useProjectsPageState(['selectedCategoryId']);

  useEffect(() => {
    selectedCategoryId.set(categoryId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  return (
    <div className={styles.projectsPage}>
      <ProjectFilterPanel />
      <ProjectsGrid />
    </div>
  );
};

export default ProjectsPageContent;

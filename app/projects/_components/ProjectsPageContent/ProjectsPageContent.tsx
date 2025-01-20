import { useEffect } from 'react';

import { useProjectsPageContext } from '@/app/hooks/useProjectsPageContext';
import ProjectFilterPanel from '../ProjectFilterPanel/ProjectFilterPanel';
import ProjectsGrid from '../ProjectsGrid/ProjectsGrid';

import styles from './ProjectsPageContent.module.scss';

interface Props {
  categoryId: number | null;
}

const ProjectsPageContent = ({ categoryId }: Props) => {
  const { updateSelectedCategoryId } = useProjectsPageContext();

  useEffect(() => {
    updateSelectedCategoryId(categoryId);
  }, [categoryId, updateSelectedCategoryId]);

  return (
    <div className={styles.projectsPage}>
      <ProjectFilterPanel />
      <ProjectsGrid />
    </div>
  );
};

export default ProjectsPageContent;

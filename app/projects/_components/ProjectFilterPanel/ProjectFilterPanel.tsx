import ProjectFilterSearch from '../ProjectFilterSearch/ProjectFilterSearch';
import ProjectFilterCategories from '../ProjectFilterCategories/ProjectFilterCategories';

import styles from './ProjectFilterPanel.module.scss';

interface Props {
  selectedCategoryId: number | null;
}

const ProjectFilterPanel = ({ selectedCategoryId }: Props) => {
  return (
    <aside className={styles.filterPanel}>
      <ProjectFilterSearch />
      <ProjectFilterCategories selectedCategoryId={selectedCategoryId} />
    </aside>
  );
};

export default ProjectFilterPanel;

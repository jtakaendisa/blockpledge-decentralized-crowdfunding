import { useProjectStore } from '@/app/store';
import { generateIncrementingArray } from '@/app/utils';
import ProjectFilterSearch from '../ProjectFilterSearch/ProjectFilterSearch';
import CategoryRow from '../CategoryRow/CategoryRow';
import CategoryRowSkeleton from '../CategoryRowSkeleton/CategoryRowSkeleton';

import styles from './ProjectFilterPanel.module.scss';

interface Props {
  selectedCategoryId: number | null;
}

const skeletons = generateIncrementingArray(13);

const ProjectFilterPanel = ({ selectedCategoryId }: Props) => {
  const categories = useProjectStore((s) => s.categories);

  return (
    <aside className={styles.filterPanel}>
      <ProjectFilterSearch />

      <CategoryRow selectedCategoryId={selectedCategoryId} />
      {categories.map((category) => (
        <CategoryRow
          key={category.id}
          category={category}
          selectedCategoryId={selectedCategoryId}
        />
      ))}
    </aside>
  );
};

export default ProjectFilterPanel;

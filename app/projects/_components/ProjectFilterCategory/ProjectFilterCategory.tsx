import classNames from 'classnames';

import { Category } from '@/app/entities';
import { useProjectsPageState } from '@/app/contexts/ProjectsPageContext';
import { usePageNavigation } from '@/app/hooks/usePageNavigation';
import CategoryIcon from '@/app/components/icons/CategoryIcon';

import styles from './ProjectFilterCategory.module.scss';

interface Props {
  category?: Category;
}

const isSelected = (
  category: Category | undefined,
  selectedCategoryId: number | null
) =>
  (typeof selectedCategoryId === 'number' && selectedCategoryId === category?.id) ||
  (!category && typeof selectedCategoryId !== 'number');

const ProjectFilterCategory = ({ category }: Props) => {
  const { selectedCategoryId } = useProjectsPageState(['selectedCategoryId']);

  const { navigateToPage } = usePageNavigation();

  const handleCategorySelect = () =>
    navigateToPage(category ? `/projects?categoryId=${category.id}` : '/projects');

  return (
    <div
      className={classNames({
        [styles.filterCategory]: true,
        [styles.selected]: isSelected(category, selectedCategoryId.get),
      })}
      onClick={handleCategorySelect}
    >
      <span className={styles.icon}>{<CategoryIcon id={category?.id} />}</span>

      <span className={styles.text}>{category?.name || 'All Categories'}</span>
    </div>
  );
};

export default ProjectFilterCategory;

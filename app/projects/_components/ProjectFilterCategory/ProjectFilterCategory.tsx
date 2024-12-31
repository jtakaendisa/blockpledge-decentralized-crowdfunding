import { ReactNode } from 'react';
import classNames from 'classnames';

import { Category } from '@/app/store';
import usePageNavigation from '@/app/hooks/usePageNavigation';
import Categories from '@/app/components/icons/Categories';

import styles from './ProjectFilterCategory.module.scss';

interface Props {
  category?: Category;
  icon?: ReactNode;
  selectedCategoryId: number | null;
}

const isSelected = (
  category: Category | undefined,
  selectedCategoryId: number | null
) =>
  (typeof selectedCategoryId === 'number' && selectedCategoryId === category?.id) ||
  (!category && typeof selectedCategoryId !== 'number');

const ProjectFilterCategory = ({ category, icon, selectedCategoryId }: Props) => {
  const { navigateToPage } = usePageNavigation();

  const handleCategorySelect = () =>
    navigateToPage(category ? `/projects?categoryId=${category.id}` : '/projects');

  return (
    <div
      className={classNames({
        [styles.filterCategory]: true,
        [styles.selected]: isSelected(category, selectedCategoryId),
      })}
      onClick={handleCategorySelect}
    >
      <span className={styles.icon}>{category ? icon : <Categories />}</span>

      <span className={styles.text}>{category ? category.name : 'All Categories'}</span>
    </div>
  );
};

export default ProjectFilterCategory;

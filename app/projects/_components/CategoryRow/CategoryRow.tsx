import classNames from 'classnames';

import { Category, categoryImageMap } from '@/app/store';
import usePageNavigation from '@/app/hooks/usePageNavigation';
import Categories from '@/app/components/icons/Categories';

import styles from './CategoryRow.module.scss';

interface Props {
  category?: Category;
  selectedCategoryId: number | null;
}

const CategoryRow = ({ category, selectedCategoryId }: Props) => {
  const { navigateToPage } = usePageNavigation();

  return (
    <div
      className={classNames({
        [styles.categoryRow]: true,
        [styles.selected]:
          selectedCategoryId === category?.id || (!category && !selectedCategoryId),
      })}
    >
      {category ? categoryImageMap[category.id] : <Categories />}
      <span
        className={styles.categoryName}
        onClick={() =>
          navigateToPage(category ? `/projects?categoryId=${category.id}` : '/projects')
        }
      >
        {category ? category.name : 'All Categories'}
      </span>
    </div>
  );
};

export default CategoryRow;

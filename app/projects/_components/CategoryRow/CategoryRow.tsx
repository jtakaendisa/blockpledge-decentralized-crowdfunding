import classNames from 'classnames';

import { Category, categoryImageMap } from '@/app/store';
import Categories from '@/app/components/icons/Categories';

import styles from './CategoryRow.module.scss';

interface Props {
  category?: Category;
  selectedCategory?: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

const CategoryRow = ({ category, selectedCategory, onSelectCategory }: Props) => {
  return (
    <div
      className={classNames({
        [styles.categoryRow]: true,
        [styles.selected]: selectedCategory?.id === category?.id,
      })}
    >
      {category ? categoryImageMap[category.id] : <Categories />}
      <span
        className={styles.categoryName}
        onClick={() => onSelectCategory(category ? category : null)}
      >
        {category ? category.name : 'All Categories'}
      </span>
    </div>
  );
};

export default CategoryRow;

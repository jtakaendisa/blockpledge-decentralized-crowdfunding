'use client';

import classNames from 'classnames';

import { Category, categoryImageMap, useProjectStore } from '@/app/store';
import Categories from '@/app/components/categories/icons/Categories';

import styles from './CategoriesSidebar.module.scss';

interface Props {
  categories: Category[];
  selectedCategory: Category | null;
}

const CategoriesSidebar = ({ categories, selectedCategory }: Props) => {
  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);

  return (
    <aside className={styles.sidebar}>
      <h2>Browse by Category</h2>
      <div>
        <div
          className={classNames({
            [styles.categoryRow]: true,
            [styles.selected]: !selectedCategory,
          })}
        >
          <Categories />
          <span
            className={styles.categoryName}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </span>
        </div>
        {categories.map((category) => (
          <div
            key={category.id}
            className={classNames({
              [styles.categoryRow]: true,
              [styles.selected]: selectedCategory?.id === category.id,
            })}
          >
            {categoryImageMap[category.id]}
            <span
              className={styles.categoryName}
              onClick={() => setSelectedCategory(category)}
            >
              {category.name}
            </span>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default CategoriesSidebar;

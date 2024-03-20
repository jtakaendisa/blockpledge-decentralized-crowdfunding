'use client';

import Image from 'next/image';
import classNames from 'classnames';

import { Category, categoryImageMap, useProjectStore } from '@/app/store';
import categoriesSVG from '@/public/icons/categories.svg';

import styles from './CategorySidebar.module.scss';

interface Props {
  categories: Category[];
  selectedCategory: Category | null;
}

const CategorySidebar = ({ categories, selectedCategory }: Props) => {
  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);

  return (
    <aside className={styles.sidebar}>
      <h2>Browse by Category</h2>
      <div>
        <div className={styles.categoryRow}>
          <Image src={categoriesSVG} alt="All Categories" width={40} height={40} />
          <span
            className={classNames({
              [styles.categoryName]: true,
              [styles.selected]: !selectedCategory,
            })}
            onClick={() => setSelectedCategory(null)}
          >
            All Categories
          </span>
        </div>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryRow}>
            <Image
              src={categoryImageMap[category.id]}
              alt={category.name}
              width={40}
              height={40}
            />
            <span
              className={classNames({
                [styles.categoryName]: true,
                [styles.selected]: selectedCategory?.id === category.id,
              })}
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

export default CategorySidebar;

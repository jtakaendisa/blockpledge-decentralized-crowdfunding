'use client';

import Image from 'next/image';

import { categoryImageMap, useProjectStore } from '@/app/store';
import categoriesSVG from '@/public/icons/categories.svg';

import styles from './CategorySidebar.module.scss';
import classNames from 'classnames';

const CategorySidebar = () => {
  const categories = useProjectStore((s) => s.categories);
  const selectedCategory = useProjectStore((s) => s.selectedCategory);
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

'use client';

import { Category, useProjectStore } from '@/app/store';
import CategoryRow from '../CategoryRow/CategoryRow';
import CategoryRowSkeleton from '../CategoryRowSkeleton/CategoryRowSkeleton';

import styles from './CategoriesSidebar.module.scss';

interface Props {
  categories: Category[];
  selectedCategoryId: number | null;
}

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const CategoriesSidebar = ({ categories, selectedCategoryId }: Props) => {
  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);

  return (
    <aside className={styles.sidebar}>
      <h2>Browse by Category</h2>
      {!categories.length ? (
        <div>
          {skeletons.map((skeleton) => (
            <CategoryRowSkeleton key={skeleton} />
          ))}
        </div>
      ) : (
        <div>
          <CategoryRow selectedCategoryId={selectedCategoryId} />
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              selectedCategoryId={selectedCategoryId}
            />
          ))}
        </div>
      )}
    </aside>
  );
};

export default CategoriesSidebar;

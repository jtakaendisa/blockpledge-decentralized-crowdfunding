'use client';

import { Category } from '@/app/store';
import { generateIncrementingArray } from '@/app/utils';
import CategoryRow from '../CategoryRow/CategoryRow';
import CategoryRowSkeleton from '../CategoryRowSkeleton/CategoryRowSkeleton';

import styles from './CategoriesSidebar.module.scss';

interface Props {
  categories: Category[];
  selectedCategoryId: number | null;
}

const skeletons = generateIncrementingArray(13);

const CategoriesSidebar = ({ categories, selectedCategoryId }: Props) => {
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

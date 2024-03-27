'use client';

import { Category, useProjectStore } from '@/app/store';
import CategoryRow from '../CategoryRow/CategoryRow';
import CategoryRowSkeleton from '../CategoryRowSkeleton/CategoryRowSkeleton';

import styles from './CategoriesSidebar.module.scss';

interface Props {
  categories: Category[];
  selectedCategory: Category | null;
}

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const CategoriesSidebar = ({ categories, selectedCategory }: Props) => {
  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);

  const handleCategorySelection = (category: Category | null) => {
    setSelectedCategory(category);
  };

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
          <CategoryRow
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelection}
          />
          {categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategorySelection}
            />
          ))}
        </div>
      )}
    </aside>
  );
};

export default CategoriesSidebar;

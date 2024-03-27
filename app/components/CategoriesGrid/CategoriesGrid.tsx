import { Category } from '@/app/store';
import CategoryCard from '../CategoryCard/CategoryCard';

import styles from './CategoriesGrid.module.scss';
import CategoryCardSkeleton from '../CategoryCardSkeleton/CategoryCardSkeleton';

interface Props {
  categories: Category[];
}

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const CategoriesGrid = ({ categories }: Props) => {
  return (
    <section className={styles.categoriesGrid}>
      <h2 className={styles.heading}>Browse Projects by Category</h2>
      <div className={styles.categoriesContainer}>
        {!categories.length
          ? skeletons.map((skeleton) => <CategoryCardSkeleton key={skeleton} />)
          : categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;

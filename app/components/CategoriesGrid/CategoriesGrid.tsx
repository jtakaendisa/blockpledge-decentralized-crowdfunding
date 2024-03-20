import { Category } from '@/app/store';
import CategoryCard from '../CategoryCard/CategoryCard';

import styles from './CategoriesGrid.module.scss';

interface Props {
  categories: Category[];
}

const CategoriesGrid = ({ categories }: Props) => {
  return (
    <section className={styles.categoriesGrid}>
      <h2 className={styles.heading}>Browse Projects by Category</h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;

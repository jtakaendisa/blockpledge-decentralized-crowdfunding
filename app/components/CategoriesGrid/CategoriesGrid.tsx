import { useProjectStore } from '@/app/store';
import { generateIncrementingArray } from '@/app/utils';
import SectionHeading from '../SectionHeading/SectionHeading';
import CategoryCard from '../CategoryCard/CategoryCard';
import CategoryCardSkeleton from '../CategoryCardSkeleton/CategoryCardSkeleton';

import styles from './CategoriesGrid.module.scss';

const skeletons = generateIncrementingArray(12);

const CategoriesGrid = () => {
  const categories = useProjectStore((s) => s.categories);

  return (
    <section className={styles.categoriesGrid}>
      <SectionHeading>Browse by Category.</SectionHeading>
      <div className={styles.categoriesContainer}>
        {!categories.length
          ? skeletons.map((skeleton) => <CategoryCardSkeleton key={skeleton} />)
          : categories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} />
            ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;

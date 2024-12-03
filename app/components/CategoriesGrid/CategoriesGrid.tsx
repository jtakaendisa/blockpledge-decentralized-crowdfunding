import { motion } from 'framer-motion';

import { Category } from '@/app/store';
import CategoryCard from '../CategoryCard/CategoryCard';
import CategoryCardSkeleton from '../CategoryCardSkeleton/CategoryCardSkeleton';

import styles from './CategoriesGrid.module.scss';
import useHeadingReveal from '@/app/hooks/useHeadingReveal';
import StaggeredText from '../StaggeredText/StaggeredText';

interface Props {
  categories: Category[];
}

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const CategoriesGrid = ({ categories }: Props) => {
  const { playAnimation, handleViewportEnter } = useHeadingReveal();

  return (
    <section className={styles.categoriesGrid}>
      <motion.h2 onViewportEnter={handleViewportEnter} className={styles.heading}>
        <StaggeredText playAnimation={playAnimation} hidden>
          Browse Projects by Category.
        </StaggeredText>
      </motion.h2>
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

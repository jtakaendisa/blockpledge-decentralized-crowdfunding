import { motion } from 'framer-motion';

import { useProjectStore } from '@/app/store';
import { generateIncrementingArray, splitArray } from '@/app/utils';
import useHeadingReveal from '@/app/hooks/useHeadingReveal';
import StaggeredText from '../StaggeredText/StaggeredText';
import CategoryCard from '../CategoryCard/CategoryCard';
import CategoryCardSkeleton from '../CategoryCardSkeleton/CategoryCardSkeleton';

import styles from './CategoriesGrid.module.scss';

const skeletons = generateIncrementingArray(12);

const CategoriesGrid = () => {
  const categories = useProjectStore((s) => s.categories);

  const { playAnimation, handleViewportEnter } = useHeadingReveal();

  return (
    <section className={styles.categoriesGrid}>
      <motion.h2 onViewportEnter={handleViewportEnter} className={styles.heading}>
        <StaggeredText playAnimation={playAnimation} hidden>
          Browse by Category.
        </StaggeredText>
      </motion.h2>
      <div className={styles.categoriesContainer}>
        {!categories.length
          ? skeletons.map((skeleton) => <CategoryCardSkeleton key={skeleton} />)
          : splitArray(categories, 3).map((subArray, rowIndex) => (
              <div key={rowIndex} className={styles.row}>
                {subArray.map((category, cardIndex) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    delay={rowIndex * 0.68 + cardIndex * 0.17}
                  />
                ))}
              </div>
            ))}
      </div>
    </section>
  );
};

export default CategoriesGrid;

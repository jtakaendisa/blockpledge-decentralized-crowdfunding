'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { Category, categoryImageMap, useProjectStore } from '@/app/store';

import styles from './CategoryCard.module.scss';

interface Props {
  category: Category;
  delay: number;
}

const revealVariant = {
  initial: {
    opacity: 0,
    y: 17,
  },
  animate: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.17,
      delay,
    },
  }),
};

const CategoryCard = ({ category, delay }: Props) => {
  const { id, name } = category;

  const router = useRouter();

  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    router.push('/projects');
  };

  const splitName = (name: string) => name.split(' & ');

  return (
    <motion.div
      variants={revealVariant}
      custom={delay}
      initial="initial"
      whileInView="animate"
      // viewport={{ once: true }}
      className={styles.categoryCard}
      onClick={() => handleSelectCategory(category)}
    >
      <div className={styles.categoryIcon}>{categoryImageMap[id]}</div>
      <div className={styles.categoryName}>
        {splitName(name).map((part, idx) => (
          <span key={part}>
            {part} {idx === 0 && '&'}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryCard;

'use client';

import Image from 'next/image';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

import { Category, useProjectStore } from '@/app/store';

import styles from './CategoriesGrid.module.scss';

interface CategoryCardProps {
  category: Category;
}

const categoryImageMap: { [key: number]: StaticImport } = {
  0: require('@/public/icons/art.svg'),
  1: require('@/public/icons/tech.svg'),
  2: require('@/public/icons/community.svg'),
  3: require('@/public/icons/fashion.svg'),
  4: require('@/public/icons/food.svg'),
  5: require('@/public/icons/gaming.svg'),
  6: require('@/public/icons/travel.svg'),
  7: require('@/public/icons/education.svg'),
  8: require('@/public/icons/health.svg'),
  9: require('@/public/icons/crafts.svg'),
  10: require('@/public/icons/finance.svg'),
  11: require('@/public/icons/pets.svg'),
};

const CategoriesGrid = () => {
  const categories = useProjectStore((s) => s.categories);

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

const CategoryCard = ({ category }: CategoryCardProps) => {
  const { id, name } = category;

  const splitName = (name: string) => name.split(' & ');

  return (
    <div className={styles.categoryCard}>
      <Image src={categoryImageMap[id]} alt={name} width={64} height={64} />
      <div className={styles.categoryName}>
        {splitName(name).map((part, idx) => (
          <span key={part}>
            {part} {idx === 0 && '&'}
          </span>
        ))}
      </div>
    </div>
  );
};

export default CategoriesGrid;

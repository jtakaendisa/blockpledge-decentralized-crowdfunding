'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Category, categoryImageMap, useProjectStore } from '@/app/store';

import styles from './CategoriesGrid.module.scss';

interface CategoryCardProps {
  category: Category;
}

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
  const router = useRouter();
  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    router.push('/browse');
  };

  const splitName = (name: string) => name.split(' & ');

  return (
    <div className={styles.categoryCard} onClick={() => handleSelectCategory(category)}>
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

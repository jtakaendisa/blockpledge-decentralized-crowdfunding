'use client';

import { useRouter } from 'next/navigation';

import { Category, categoryImageMap, useProjectStore } from '@/app/store';

import styles from './CategoryCard.module.scss';

interface Props {
  category: Category;
}

const CategoryCard = ({ category }: Props) => {
  const { id, name } = category;
  const router = useRouter();
  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    router.push('/projects');
  };

  const splitName = (name: string) => name.split(' & ');

  return (
    <div className={styles.categoryCard} onClick={() => handleSelectCategory(category)}>
      <div className={styles.categoryIcon}>{categoryImageMap[id]}</div>
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

export default CategoryCard;

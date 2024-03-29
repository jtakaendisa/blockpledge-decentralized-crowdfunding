import classNames from 'classnames';

import { Category, categoryImageMap, useProjectStore } from '@/app/store';

import styles from './MobileCategoryCard.module.scss';

interface Props {
  category: Category;
  selectedCategory: Category | null;
  closeDropdown: () => void;
}

const MobileCategoryCard = ({ category, selectedCategory, closeDropdown }: Props) => {
  const { id, name } = category;
  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    closeDropdown();
  };

  const splitName = (name: string) => name.split(' & ');

  return (
    <div className={styles.categoryCard} onClick={() => handleSelectCategory(category)}>
      <div
        className={classNames({
          [styles.categoryIcon]: true,
          [styles.selected]: selectedCategory?.id === category?.id,
        })}
      >
        {categoryImageMap[id]}
      </div>
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

export default MobileCategoryCard;

import { useEffect, useRef, useState } from 'react';

import { Category } from '@/app/store';
import MobileCategoryCard from '../MobileCategoryCard/MobileCategoryCard';
import Categories from '@/app/components/icons/Categories';

import styles from './CategoriesDropdown.module.scss';

interface Props {
  categories: Category[];
  selectedCategory: Category | null;
}

const CategoriesDropdown = ({ categories, selectedCategory }: Props) => {
  const dropdownIconRef = useRef<HTMLDivElement>(null);
  const dropdownMenuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (
        dropdownIconRef.current &&
        dropdownMenuRef.current &&
        !dropdownIconRef.current.contains(e.target as Node) &&
        !dropdownMenuRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div
        ref={dropdownIconRef}
        className={styles.dropdownIcon}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Categories />
      </div>
      {isOpen && (
        <div ref={dropdownMenuRef} className={styles.dropdownMenu}>
          {categories.map((category) => (
            <MobileCategoryCard
              key={category.id}
              category={category}
              selectedCategory={selectedCategory}
              closeDropdown={() => setIsOpen((prev) => !prev)}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CategoriesDropdown;

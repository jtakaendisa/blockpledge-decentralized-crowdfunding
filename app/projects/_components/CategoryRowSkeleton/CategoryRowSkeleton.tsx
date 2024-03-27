import Skeleton from 'react-loading-skeleton';

import styles from './CategoryRowSkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const CategoryRowSkeleton = () => {
  return (
    <div className={styles.categoryRow}>
      <Skeleton width={40} height={40} />
      <div className={styles.categoryName}>
        <Skeleton height={16} />
      </div>
    </div>
  );
};

export default CategoryRowSkeleton;

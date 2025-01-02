import Skeleton from 'react-loading-skeleton';

import styles from './CategoryCardSkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const CategoryCardSkeleton = () => {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryIcon}>
        <Skeleton width={80} height={60} borderRadius={10} />
      </div>
      <div className={styles.categoryName}>
        <Skeleton width={100} height={16} />
        <Skeleton width={85} height={16} />
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;

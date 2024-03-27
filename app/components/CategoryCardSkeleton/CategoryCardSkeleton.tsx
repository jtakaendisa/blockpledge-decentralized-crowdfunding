import Skeleton from 'react-loading-skeleton';

import styles from './CategoryCardSkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const CategoryCardSkeleton = () => {
  return (
    <div className={styles.categoryCard}>
      <div className={styles.categoryIcon}>
        <Skeleton width={80} height={60} />
      </div>
      <div className={styles.categoryName}>
        <span>
          <Skeleton width={80} height={12} />
        </span>
        <span>
          <Skeleton width={80} height={12} />
        </span>
      </div>
    </div>
  );
};

export default CategoryCardSkeleton;

import Skeleton from 'react-loading-skeleton';

import styles from './ProjectFilterSearchSkeleton.module.scss';

const ProjectFilterSearchSkeleton = () => {
  return (
    <div className={styles.column}>
      <div className={styles.row}>
        <Skeleton width={32} height={32} circle />

        <span className={styles.searchQuery}>
          <Skeleton width="85%" height={20} />
        </span>
      </div>

      <Skeleton width="100%" height={2} />
    </div>
  );
};

export default ProjectFilterSearchSkeleton;

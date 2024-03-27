import Skeleton from 'react-loading-skeleton';

import styles from './ProjectCardSkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const ProjectCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <Skeleton height="100%" />
      </div>
      <div className={styles.info}>
        <h5>
          <Skeleton />
        </h5>
        <div className={styles.ownerDetails}>
          <Skeleton circle width={20} height={20} />
          <small>
            <Skeleton width={100} height={12} />
          </small>
        </div>
        <small className={styles.remainingTime}>
          <Skeleton width={90} height={10} />
        </small>
        <Skeleton width="100%" height={6} />
        <div className={styles.row}>
          <small>
            <Skeleton width={70} height={10} />
          </small>
          <small className={styles.cost}>
            <Skeleton width={70} height={10} />
          </small>
        </div>
        <div className={styles.backingInfo}>
          <small>
            <Skeleton width={40} height={12} />
          </small>
          <small>
            <Skeleton width={25} height={12} />
          </small>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;

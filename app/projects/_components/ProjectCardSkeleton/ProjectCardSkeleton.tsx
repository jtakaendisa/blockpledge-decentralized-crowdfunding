import Skeleton from 'react-loading-skeleton';

import VerticalSpacer from '@/app/components/VerticalSpacer/VerticalSpacer';
import SpaceBetweenRow from '@/app/components/SpaceBetweenRow/SpaceBetweenRow';

import styles from './ProjectCardSkeleton.module.scss';

const ProjectCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Skeleton width="100%" height="100%" />
      </div>

      <div className={styles.contentContainer}>
        <span className={styles.title}>
          <Skeleton width="78%" />
        </span>
        <VerticalSpacer height={11} />

        <div className={styles.ownerInfo}>
          <Skeleton width={15} height={15} circle />
          <span className={styles.walletAddress}>
            <Skeleton width={105} />
          </span>
        </div>
        <VerticalSpacer height={11} />

        <span className={styles.text}>
          <Skeleton width={75} />
        </span>
        <VerticalSpacer height={5} />

        <Skeleton width="100%" height={4} />
        <VerticalSpacer height={5} />

        <SpaceBetweenRow>
          <span className={styles.text}>
            <Skeleton width={45} />
          </span>
          <span className={styles.text}>
            <Skeleton width={65} />
          </span>
        </SpaceBetweenRow>
        <VerticalSpacer />

        <SpaceBetweenRow>
          <span className={styles.text}>
            <Skeleton width={80} />
          </span>
          <span className={styles.text}>
            <Skeleton width={105} />
          </span>
        </SpaceBetweenRow>
      </div>
    </div>
  );
};

export default ProjectCardSkeleton;

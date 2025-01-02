import Skeleton from 'react-loading-skeleton';

import VerticalSpacer from '@/app/components/VerticalSpacer/VerticalSpacer';
import SpaceBetweenRow from '@/app/components/SpaceBetweenRow/SpaceBetweenRow';

import styles from './ProjectCardWithHoverRevealSkeleton.module.scss';

const ProjectCardWithHoverRevealSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Skeleton width="100%" height="100%" />
      </div>
      <VerticalSpacer height={3} />

      <div className={styles.contentContainer}>
        <SpaceBetweenRow>
          <span className={styles.text}>
            <Skeleton width={60} />
          </span>
          <span className={styles.text}>
            <Skeleton width={45} />
          </span>
        </SpaceBetweenRow>
        <VerticalSpacer height={12} />

        <span className={styles.heading}>
          <Skeleton width="78%" />
        </span>
        <VerticalSpacer height={8} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Skeleton circle width={22} height={22} />
          <span className={styles.largeText}>
            <Skeleton width={100} />
          </span>
        </div>
        <VerticalSpacer height={8} />
      </div>
    </div>
  );
};

export default ProjectCardWithHoverRevealSkeleton;

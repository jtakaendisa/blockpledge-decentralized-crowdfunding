import Skeleton from 'react-loading-skeleton';

import SpaceBetweenRow from '@/app/components/SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '@/app/components/VerticalSpacer/VerticalSpacer';

import styles from './ProjectsHighlightSkeleton.module.scss';

const ProjectsHighlightSkeleton = () => {
  return (
    <div className={styles.highlight}>
      <div className={styles.imageContainer}>
        <Skeleton width="100%" height="100%" />
      </div>
      <VerticalSpacer height={6} />

      <div className={styles.contentContainer}>
        <SpaceBetweenRow>
          <span className={styles.text}>
            <Skeleton width={90} />
          </span>
          <span className={styles.text}>
            <Skeleton width={60} />
          </span>
        </SpaceBetweenRow>
        <VerticalSpacer />

        <span className={styles.heading}>
          <Skeleton width="85%" />
        </span>
        <VerticalSpacer height={6} />

        <span className={styles.largeText}>
          <Skeleton width="20%" />
        </span>
        <VerticalSpacer />

        <SpaceBetweenRow>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Skeleton circle width={22} height={22} />
            <span className={styles.largeText}>
              <Skeleton width={100} />
            </span>
          </div>
          <span className={styles.largeText}>
            <Skeleton width={120} />
          </span>
        </SpaceBetweenRow>
        <VerticalSpacer height={6} />

        <span className={styles.largeText}>
          <Skeleton width="18%" />
        </span>
        <VerticalSpacer height={24} />

        <Skeleton className={styles.largeText} count={4} />
        <VerticalSpacer height={24} />

        <div className={styles.buttonContainer}>
          <div className={styles.button}>
            <Skeleton width={154} height={46} borderRadius={50} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsHighlightSkeleton;

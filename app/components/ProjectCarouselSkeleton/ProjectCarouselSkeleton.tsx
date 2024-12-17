import Skeleton from 'react-loading-skeleton';

import { generateIncrementingArray } from '@/app/utils';
import VerticalSpacer from '../VerticalSpacer/VerticalSpacer';
import SpaceBetweenRow from '../SpaceBetweenRow/SpaceBetweenRow';

import styles from './ProjectCarouselSkeleton.module.scss';

const ProjectCarouselSkeleton = () => {
  return (
    <div className={styles.projectCarousel}>
      <div className={styles.grid}>
        {generateIncrementingArray(4).map((skeleton) => (
          <div key={skeleton} className={styles.card}>
            <div className={styles.imageContainer}>
              <Skeleton width="100%" height="100%" />
            </div>

            {/* <ProjectProgressBar raised={raised} cost={cost} height={10} flatEdge /> */}
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
        ))}
      </div>

      <div className={styles.pagination}>
        <span className={styles.arrow}>
          <Skeleton width={20} />
        </span>
        <span className={styles.pageNumbers}>
          <Skeleton width={80} />
        </span>
        <span className={styles.arrow}>
          <Skeleton width={20} />
        </span>
      </div>
    </div>
  );
};

export default ProjectCarouselSkeleton;

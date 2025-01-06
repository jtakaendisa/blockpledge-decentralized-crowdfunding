import Skeleton from 'react-loading-skeleton';

import { generateIncrementingArray } from '@/app/utils';
import CompactProjectCardSkeleton from '../CompactProjectCardSkeleton/CompactProjectCardSkeleton';

import styles from './DashboardProjectsSectionSkeleton.module.scss';

const skeletons = generateIncrementingArray(12);

const DashboardProjectsSectionSkeleton = () => {
  return (
    <section className={styles.dashboardProjectsSection}>
      <h2 className={styles.heading}>
        <Skeleton width="45%" />
      </h2>

      <div className={styles.dashboardProjectsCarousel}>
        <div className={styles.grid}>
          {skeletons.map((skeleton) => (
            <CompactProjectCardSkeleton key={skeleton} />
          ))}
        </div>

        <div className={styles.pagination}>
          <span>
            <Skeleton width={20} />
          </span>
          <span className={styles.pageIndicator}>
            <Skeleton width={60} />
          </span>
          <span>
            <Skeleton width={20} />
          </span>
        </div>
      </div>
    </section>
  );
};

export default DashboardProjectsSectionSkeleton;

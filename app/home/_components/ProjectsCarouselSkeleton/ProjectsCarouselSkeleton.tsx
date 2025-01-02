import Skeleton from 'react-loading-skeleton';

import { generateIncrementingArray } from '@/app/utils';
import ProjectCardWithHoverRevealSkeleton from '../ProjectCardWithHoverRevealSkeleton/ProjectCardWithHoverRevealSkeleton';

import styles from './ProjectsCarouselSkeleton.module.scss';

const ProjectsCarouselSkeleton = () => {
  return (
    <div className={styles.projectCarousel}>
      <div className={styles.grid}>
        {generateIncrementingArray(4).map((skeleton) => (
          <ProjectCardWithHoverRevealSkeleton key={skeleton} />
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

export default ProjectsCarouselSkeleton;

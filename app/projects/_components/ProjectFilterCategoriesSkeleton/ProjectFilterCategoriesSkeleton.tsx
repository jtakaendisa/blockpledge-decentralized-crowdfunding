import Skeleton from 'react-loading-skeleton';

import { generateIncrementingArray } from '@/app/utils';

import styles from './ProjectFilterCategoriesSkeleton.module.scss';

const skeletons = generateIncrementingArray(13);

const ProjectFilterCategoriesSkeleton = () => {
  return (
    <div className={styles.column}>
      {skeletons.map((skeleton) => (
        <div key={skeleton} className={styles.filterCategory}>
          <Skeleton width={40} height={40} borderRadius={8} />
          <span className={styles.text}>
            <Skeleton width={`${35 + Math.floor(Math.random() * 36)}%`} height={16} />
          </span>
        </div>
      ))}
    </div>
  );
};

export default ProjectFilterCategoriesSkeleton;

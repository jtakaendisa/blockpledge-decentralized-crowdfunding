import Skeleton from 'react-loading-skeleton';

import ProjectTitle from '../ProjectTitle/ProjectTitle';
import ProjectText from '../ProjectText/ProjectText';
import SpaceBetweenRow from '../SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../VerticalSpacer/VerticalSpacer';

import styles from './CompactProjectCardSkeleton.module.scss';

const CompactProjectCardSkeleton = () => {
  return (
    <div className={styles.compactProjectCard}>
      <div className={styles.imageContainer}>
        <Skeleton width={100} height={100} />
      </div>

      <div className={styles.content}>
        <SpaceBetweenRow>
          <ProjectTitle>
            <Skeleton width={140 + Math.ceil(Math.random() * 90)} />
          </ProjectTitle>
          <ProjectText>
            <Skeleton width={40} />
          </ProjectText>
        </SpaceBetweenRow>

        <Skeleton width={90} />
        <VerticalSpacer height={2} />

        <span className={styles.owner}>
          <Skeleton width={20} height={20} circle />
          <Skeleton width={100} />
        </span>
        <VerticalSpacer height={8} />

        <ProjectText>
          <Skeleton width={260} />
        </ProjectText>
      </div>
    </div>
  );
};

export default CompactProjectCardSkeleton;

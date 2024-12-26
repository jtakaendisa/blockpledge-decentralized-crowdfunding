import Skeleton from 'react-loading-skeleton';

import { generateIncrementingArray } from '@/app/utils';
import ProjectTitle from '@/app/components/ProjectTitle/ProjectTitle';
import ProjectText from '@/app/components/ProjectText/ProjectText';
import FullWidthWrapper from '@/app/components/FullWidthWrapper/FullWidthWrapper';
import SpaceBetweenRow from '@/app/components/SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '@/app/components/VerticalSpacer/VerticalSpacer';

import styles from './ProjectDetailsSkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const ProjectDetailsSkeleton = () => {
  return (
    <section className={styles.details}>
      {/* Image Gallery */}
      <div className={styles.imageGallery}>
        {/* Image Cards */}
        <div className={styles.imageCards}>
          {generateIncrementingArray(3).map((element) => (
            <div key={element} className={styles.imageCard}>
              <Skeleton height="100%" borderRadius={10} />
            </div>
          ))}
        </div>

        {/* Main Image */}
        <div className={styles.mainImage}>
          <Skeleton height="100%" borderRadius={24} />
        </div>
      </div>

      {/* Details Content */}
      <div className={styles.content}>
        <div className={styles.topRow}>
          <FullWidthWrapper>
            <ProjectTitle fontSize={24} fontWeight={700}>
              <Skeleton width="70%" height="100%" />
            </ProjectTitle>
          </FullWidthWrapper>
          <div className={styles.followButton}>
            <Skeleton height="100%" />
          </div>
        </div>
        <VerticalSpacer />

        {/* Category */}
        <FullWidthWrapper>
          <ProjectText fontSize={16} fontWeight={600}>
            <Skeleton width="25%" height="100%" />
          </ProjectText>
        </FullWidthWrapper>
        <VerticalSpacer />

        {/* Owner Info and Status */}
        <SpaceBetweenRow>
          <div className={styles.ownerInfo}>
            <Skeleton width={22} height={22} circle />
            <ProjectText fontSize={16} fontWeight={600}>
              <Skeleton width={160} height="100%" />
            </ProjectText>
          </div>
          <ProjectText fontSize={16} fontWeight={600}>
            <Skeleton width={100} height="100%" />
          </ProjectText>
        </SpaceBetweenRow>
        <VerticalSpacer height={32} />

        {/* Description */}
        <FullWidthWrapper>
          <ProjectText fontSize={16}>
            <Skeleton height="100%" count={2} />
            <Skeleton width="60%" height="100%" />
          </ProjectText>
        </FullWidthWrapper>
        <VerticalSpacer height={32} />

        {/* Metrics and Payout Policy */}
        <SpaceBetweenRow>
          <div className={styles.metrics}>
            {generateIncrementingArray(2).map((element) => (
              <div key={element} className={styles.metric}>
                <span className={styles.value}>
                  <Skeleton width={40} height="100%" />
                </span>
                <span className={styles.unit}>
                  <Skeleton width={65} height="100%" />
                </span>
              </div>
            ))}
          </div>
          <div className={styles.payoutPolicy}>
            <h6 className={styles.title}>
              <Skeleton width="60%" height="100%" />
            </h6>
            <p className={styles.description}>
              <Skeleton height="100%" count={2} />
            </p>
          </div>
        </SpaceBetweenRow>
        <VerticalSpacer height={24} />

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <Skeleton height="100%" borderRadius={50} />
        </div>
        <VerticalSpacer height={12} />

        {/* Progress Bar Labels */}
        <SpaceBetweenRow>
          <ProjectText fontSize={16} fontWeight={500}>
            <Skeleton width={110} height="100%" />
          </ProjectText>
          <ProjectText fontSize={16} fontWeight={500}>
            <Skeleton width={80} height="100%" />
          </ProjectText>
        </SpaceBetweenRow>
        <VerticalSpacer height={48} />

        {/* Buttons and Socials */}
        <SpaceBetweenRow>
          <div className={styles.buttons}>
            {generateIncrementingArray(2).map((element) => (
              <div key={element} className={styles.button}>
                <Skeleton height="100%" borderRadius={40} />
              </div>
            ))}
          </div>
          <div className={styles.socials}>
            {generateIncrementingArray(4).map((element) => (
              <div key={element} className={styles.socialButton}>
                <Skeleton height="100%" circle />
              </div>
            ))}
          </div>
        </SpaceBetweenRow>
      </div>
    </section>
  );
};

export default ProjectDetailsSkeleton;

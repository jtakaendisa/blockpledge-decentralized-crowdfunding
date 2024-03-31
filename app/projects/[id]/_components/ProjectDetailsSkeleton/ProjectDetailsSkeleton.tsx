import Skeleton from 'react-loading-skeleton';

import { Media, MediaContextProvider } from '@/app/media';

import styles from './ProjectDetailsSkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const ProjectDetailsSkeleton = () => {
  return (
    <MediaContextProvider>
      <Media greaterThanOrEqual="cus">
        <section className={styles.mainContainer}>
          <div className={styles.imageGallery}>
            <div className={styles.imageLarge}>
              <Skeleton height="100%" />
            </div>
            <div className={styles.imageRow}>
              <div className={styles.imageSmall}>
                <Skeleton height="100%" />
              </div>
              <div className={styles.imageSmall}>
                <Skeleton height="100%" />
              </div>
              <div className={styles.imageSmall}>
                <Skeleton height="100%" />
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>
              <Skeleton width="65%" height={22} />
            </h2>
            <span className={styles.category}>
              <Skeleton width="25%" height={18} />
            </span>
            <div className={styles.row}>
              <div className={styles.account}>
                <Skeleton circle width={22} height={22} />
                <Skeleton width={90} height={18} />
              </div>
              <span className={styles.status}>
                <Skeleton width={60} height={18} />
              </span>
            </div>
            <p className={styles.description}>
              <Skeleton height={12} />
              <Skeleton height={12} />
              <Skeleton width="60%" height={12} />
            </p>
            <div className={styles.row} style={{ marginBottom: -12 }}>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span>
                    <Skeleton width={40} height={20} />
                  </span>
                  <span>
                    <Skeleton width={60} height={16} />
                  </span>
                </div>
                <div className={styles.stat}>
                  <span>
                    <Skeleton width={40} height={20} />
                  </span>
                  <span>
                    <Skeleton width={60} height={16} />
                  </span>
                </div>
              </div>
              <div className={styles.policy}>
                <span>
                  <Skeleton width={90} height={12} />
                </span>
                <p>
                  <Skeleton width={160} height={8} />
                </p>
                <p>
                  <Skeleton width={70} height={8} />
                </p>
              </div>
            </div>
            <div style={{ marginBottom: -4 }}>
              <Skeleton height={6} />
            </div>
            <div className={styles.row} style={{ marginBottom: -4 }}>
              <span>
                <Skeleton width={110} height={16} />
              </span>
              <div className={styles.etherTarget}>
                <Skeleton width={80} height={16} />
              </div>
            </div>
            <div className={`${styles.row} ${styles.spacer}`}>
              <div className={styles.buttons}>
                <Skeleton width={140} height={36} borderRadius={50} />
                <Skeleton width={140} height={36} borderRadius={50} />
              </div>
              <div className={styles.socials}>
                <Skeleton width={40} height={40} circle />
                <Skeleton width={40} height={40} circle />
                <Skeleton width={40} height={40} circle />
                <Skeleton width={40} height={40} circle />
              </div>
            </div>
          </div>
        </section>
      </Media>
      <Media lessThan="cus">
        <section className={styles.mobileMainContainer}>
          <div className={styles.imageGallery}>
            <div className={styles.imageLarge}>
              <Skeleton height="100%" />
            </div>
            <div className={styles.imageColumn}>
              <div className={styles.imageSmall}>
                <Skeleton height="100%" />
              </div>
              <div className={styles.imageSmall}>
                <Skeleton height="100%" />
              </div>
              <div className={styles.imageSmall}>
                <Skeleton height="100%" />
              </div>
            </div>
          </div>
          <div className={styles.info}>
            <h2 className={styles.title}>
              <Skeleton width="65%" height={22} />
            </h2>
            <span className={styles.category}>
              <Skeleton width="25%" height={18} />
            </span>
            <div className={styles.row}>
              <div className={styles.account}>
                <Skeleton circle width={22} height={22} />
                <Skeleton width={90} height={18} />
              </div>
              <span className={styles.status}>
                <Skeleton width={60} height={18} />
              </span>
            </div>
            <p className={styles.description}>
              <Skeleton height={12} />
              <Skeleton height={12} />
            </p>
            <div className={styles.row} style={{ marginBottom: -12 }}>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span>
                    <Skeleton width={40} height={20} />
                  </span>
                  <span>
                    <Skeleton width={60} height={16} />
                  </span>
                </div>
                <div className={styles.stat}>
                  <span>
                    <Skeleton width={40} height={20} />
                  </span>
                  <span>
                    <Skeleton width={60} height={16} />
                  </span>
                </div>
              </div>
              <div className={styles.policy}>
                <span>
                  <Skeleton width={90} height={12} />
                </span>
                <p>
                  <Skeleton width={160} height={8} />
                </p>
                <p>
                  <Skeleton width={70} height={8} />
                </p>
              </div>
            </div>
            <div style={{ marginBottom: -4 }}>
              <Skeleton height={6} />
            </div>
            <div className={styles.row} style={{ marginBottom: -4 }}>
              <span>
                <Skeleton width={110} height={16} />
              </span>
              <div className={styles.etherTarget}>
                <Skeleton width={80} height={16} />
              </div>
            </div>
            <div className={`${styles.row} ${styles.spacer}`}>
              <div className={styles.buttons}>
                <Skeleton width={140} height={36} borderRadius={50} />
                <Skeleton width={140} height={36} borderRadius={50} />
              </div>
              <div className={styles.socials}>
                <Skeleton width={40} height={40} circle />
                <Skeleton width={40} height={40} circle />
                <Skeleton width={40} height={40} circle />
                <Skeleton width={40} height={40} circle />
              </div>
            </div>
          </div>
        </section>{' '}
      </Media>
    </MediaContextProvider>
  );
};

export default ProjectDetailsSkeleton;

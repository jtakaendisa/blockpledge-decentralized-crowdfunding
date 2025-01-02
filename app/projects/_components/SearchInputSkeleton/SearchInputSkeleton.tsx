import Skeleton from 'react-loading-skeleton';

import styles from './SearchInputSkeleton.module.scss';

const SearchInputSkeleton = () => {
  return (
    <div className={styles.searchInputSkeleton}>
      <Skeleton height={46} borderRadius={50} />
    </div>
  );
};

export default SearchInputSkeleton;

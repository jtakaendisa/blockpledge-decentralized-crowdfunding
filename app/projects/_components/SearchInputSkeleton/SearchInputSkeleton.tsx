import Skeleton from 'react-loading-skeleton';

import styles from './SearchInputSkeleton.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const SearchInputSkeleton = () => {
  return (
    <div className={styles.searchInputSkeleton}>
      <Skeleton height={46} borderRadius={50} />
    </div>
  );
};

export default SearchInputSkeleton;

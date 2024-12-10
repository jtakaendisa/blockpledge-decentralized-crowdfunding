'use client';

import TopNavHomeButton from '../TopNavHomeButton/TopNavHomeButton';
import TopNavLinks from '../TopNavLinks/TopNavLinks';

import styles from './TopNav.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const TopNav = () => {
  return (
    <header className={styles.header}>
      <TopNavHomeButton />
      <TopNavLinks />
    </header>
  );
};

export default TopNav;

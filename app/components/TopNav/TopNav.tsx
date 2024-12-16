'use client';

import HomeButton from '../HomeButton/HomeButton';
import TopNavLinks from '../TopNavLinks/TopNavLinks';

import styles from './TopNav.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const TopNav = () => {
  return (
    <header className={styles.header}>
      <HomeButton />
      <TopNavLinks />
    </header>
  );
};

export default TopNav;

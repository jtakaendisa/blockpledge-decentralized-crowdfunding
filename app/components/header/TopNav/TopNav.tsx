'use client';

import { Media } from '@/app/media';
import { useTopNav } from '@/app/hooks/useTopNav';
import HomeButton from '../../HomeButton/HomeButton';
import TopNavLinks from '../TopNavLinks/TopNavLinks';
import TopNavMobileMenu from '../TopNavMobileMenu/TopNavMobileMenu';
import TopNavAuthMenu from '../TopNavAuthMenu/TopNavAuthMenu';

import styles from './TopNav.module.scss';

const TopNav = () => {
  const { links, isAuthenticating, authUser, loadingAuth } = useTopNav();

  return (
    <header className={styles.header}>
      <HomeButton />

      <div className={styles.row}>
        <Media greaterThanOrEqual="sm">
          <TopNavLinks links={links} isAuthenticating={isAuthenticating} />
        </Media>

        <Media lessThan="sm">
          <TopNavMobileMenu links={links} />
        </Media>

        <TopNavAuthMenu
          authUser={authUser}
          loadingAuth={loadingAuth}
          isAuthenticating={isAuthenticating}
        />
      </div>
    </header>
  );
};

export default TopNav;

'use client';

import { Media } from '@/app/media';
import { useTopNav } from '@/app/hooks/useTopNav';
import HomeButton from '../../HomeButton/HomeButton';
import TopNavLinks from '../TopNavLinks/TopNavLinks';
import TopNavMobileMenu from '../TopNavMobileMenu/TopNavMobileMenu';
import TopNavAuthMenu from '../TopNavAuthMenu/TopNavAuthMenu';

import styles from './TopNav.module.scss';

const TopNav = () => {
  const { isLoadingAuth, authUser, links } = useTopNav();

  return (
    <header className={styles.header}>
      <HomeButton />

      <div className={styles.row}>
        <Media greaterThanOrEqual="sm">
          <TopNavLinks
            links={links}
            isLoadingAuth={isLoadingAuth}
            authUser={authUser}
          />
        </Media>

        <Media lessThan="sm">
          <TopNavMobileMenu links={links} />
        </Media>

        <TopNavAuthMenu isLoadingAuth={isLoadingAuth} authUser={authUser} />
      </div>
    </header>
  );
};

export default TopNav;

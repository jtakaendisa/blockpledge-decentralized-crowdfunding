'use client';

import { routes } from '@/app/constants';
import { Media } from '@/app/media';
import useTopNav from '@/app/hooks/useTopNav';
import HomeButton from '../HomeButton/HomeButton';
import TopNavLinks from '../TopNavLinks/TopNavLinks';
import TopNavMobileMenu from '../TopNavMobileMenu/TopNavMobileMenu';
import TopNavAuthMenu from '../TopNavAuthMenu/TopNavAuthMenu';

import styles from './TopNav.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const TopNav = () => {
  const { isAdmin, isAuthenticating, authUser, loadingAuth } = useTopNav();

  const links = [
    {
      label: 'Explore Projects',
      routePath: routes.projects,
      isEnabled: true,
    },
    {
      label: 'My Dashboard',
      routePath: routes.userDashboard,
      isEnabled: authUser && !isAdmin,
    },
    {
      label: 'Admin Dashboard',
      routePath: routes.adminDashboard,
      isEnabled: isAdmin,
    },
  ];

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

        <TopNavAuthMenu authUser={authUser} loadingAuth={loadingAuth} />
      </div>
    </header>
  );
};

export default TopNav;

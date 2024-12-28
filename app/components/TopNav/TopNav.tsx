'use client';

import { routes } from '@/app/constants';
import { Media } from '@/app/media';
import usePageNavigation from '@/app/hooks/usePageNavigation';
import useTopNav from '@/app/hooks/useTopNav';
import HomeButton from '../HomeButton/HomeButton';
import TopNavLinks from '../TopNavLinks/TopNavLinks';
import TopNavMobileMenu from '../TopNavMobileMenu/TopNavMobileMenu';
import TopNavAuthMenu from '../TopNavAuthMenu/TopNavAuthMenu';

import styles from './TopNav.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const TopNav = () => {
  const { animatePageOut } = usePageNavigation();
  const {
    isAdmin,
    isAuthenticating,
    authUser,
    connectedAccount,
    loadingAuth,
    hoveredLink,
    handleLinkHover,
    resetSelectedCategory,
  } = useTopNav();

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
          <TopNavLinks
            links={links}
            isAuthenticating={isAuthenticating}
            hoveredLink={hoveredLink}
            onHover={handleLinkHover}
            onComplete={resetSelectedCategory}
          />
        </Media>

        <Media lessThan="sm">
          <TopNavMobileMenu links={links} onNavigate={animatePageOut} />
        </Media>

        <TopNavAuthMenu
          authUser={authUser}
          connectedAccount={connectedAccount}
          loadingAuth={loadingAuth}
          onNavigate={animatePageOut}
        />
      </div>
    </header>
  );
};

export default TopNav;

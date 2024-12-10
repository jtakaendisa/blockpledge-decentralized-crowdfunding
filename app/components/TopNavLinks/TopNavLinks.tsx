import Skeleton from 'react-loading-skeleton';

import { Media } from '@/app/media';
import { routes } from '@/app/constants';
import usePageNavigation from '@/app/hooks/usePageNavigation';
import useTopNavLinks from '@/app/hooks/useTopNavLinks';
import TopNavLink from '../TopNavLink/TopNavLink';
import TopNavDropdownMenu from '../TopNavDropdownMenu/TopNavDropdownMenu';

import styles from './TopNavLinks.module.scss';

const TopNavLinks = () => {
  const { animatePageOut } = usePageNavigation();
  const {
    authUser,
    connectedAccount,
    isAdmin,
    loadingAuth,
    hoveredLink,
    handleLinkHover,
    resetSelectedCategory,
    handleWalletConnection,
  } = useTopNavLinks();

  return (
    <div className={styles.topNavLinks}>
      <Media greaterThanOrEqual="sm">
        <ul className={styles.row}>
          <TopNavLink
            routePath={routes.projects}
            hoveredLink={hoveredLink}
            onHover={handleLinkHover}
            onComplete={resetSelectedCategory}
          >
            Explore Projects
          </TopNavLink>
          {loadingAuth && !authUser && <Skeleton width={110} height={16} />}
          {authUser && !isAdmin && (
            <TopNavLink
              routePath={routes.userDashboard}
              hoveredLink={hoveredLink}
              onHover={handleLinkHover}
              onComplete={resetSelectedCategory}
            >
              My Dashboard
            </TopNavLink>
          )}
          {loadingAuth && !authUser && <Skeleton circle width={40} height={40} />}
          {isAdmin && (
            <TopNavLink
              routePath={routes.adminDashboard}
              hoveredLink={hoveredLink}
              onHover={handleLinkHover}
              onComplete={resetSelectedCategory}
            >
              Admin Dashboard
            </TopNavLink>
          )}
        </ul>
      </Media>
      <TopNavDropdownMenu
        authUser={authUser}
        connectedAccount={connectedAccount}
        isAdmin={isAdmin}
        loadingAuth={loadingAuth}
        onWalletConnect={handleWalletConnection}
        onNavigate={animatePageOut}
      />
    </div>
  );
};

export default TopNavLinks;

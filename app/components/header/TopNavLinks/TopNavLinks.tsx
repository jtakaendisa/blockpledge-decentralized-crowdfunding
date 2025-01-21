import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { AuthUser, RoutePath, TopNavLink as TNLink } from '@/app/entities';
import TopNavLink from '../TopNavLink/TopNavLink';

import styles from './TopNavLinks.module.scss';

interface Props {
  isLoadingAuth: boolean;
  authUser: AuthUser | null;
  links: TNLink[];
}

const TopNavLinks = ({ isLoadingAuth, authUser, links }: Props) => {
  const [hoveredLink, setHoveredLink] = useState<RoutePath | null>(null);

  const handleLinkHover = (hoveredLink: RoutePath | null) =>
    setHoveredLink(hoveredLink);

  return (
    <ul className={styles.topNavLinks}>
      {links.map(({ label, routePath, isEnabled }) =>
        isEnabled ? (
          <TopNavLink
            key={label}
            routePath={routePath}
            hoveredLink={hoveredLink}
            onHover={handleLinkHover}
          >
            {label}
          </TopNavLink>
        ) : null
      )}

      {isLoadingAuth && !authUser && <Skeleton width={110} height={16} />}
    </ul>
  );
};

export default TopNavLinks;

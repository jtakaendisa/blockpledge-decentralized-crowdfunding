import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { RoutePath, TopNavLink as TNLink } from '@/app/entities';
import TopNavLink from '../TopNavLink/TopNavLink';

import styles from './TopNavLinks.module.scss';

interface Props {
  links: TNLink[];
  isAuthenticating: boolean;
}

const TopNavLinks = ({ links, isAuthenticating }: Props) => {
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

      {isAuthenticating && <Skeleton width={110} height={16} />}
    </ul>
  );
};

export default TopNavLinks;

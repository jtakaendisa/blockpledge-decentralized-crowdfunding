import Skeleton from 'react-loading-skeleton';

import { RoutePath, TopNavLink as TNLink } from '@/app/entities';
import TopNavLink from '../TopNavLink/TopNavLink';

import styles from './TopNavLinks.module.scss';

interface Props {
  links: TNLink[];
  isAuthenticating: boolean;
  hoveredLink: RoutePath | null;
  onHover: (hoveredLink: RoutePath | null) => void;
  onComplete: () => void;
}

const TopNavLinks = ({
  links,
  isAuthenticating,
  hoveredLink,
  onHover,
  onComplete,
}: Props) => {
  return (
    <ul className={styles.topNavLinks}>
      {links.map(({ label, routePath, isEnabled }) =>
        isEnabled ? (
          <TopNavLink
            key={label}
            routePath={routePath}
            hoveredLink={hoveredLink}
            onHover={onHover}
            onComplete={onComplete}
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

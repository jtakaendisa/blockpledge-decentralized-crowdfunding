import { RoutePath, TopNavLink } from '@/app/entities';
import TopNavMobileMenuLink from '../TopNavMobileMenuLink/TopNavMobileMenuLink';

import styles from './TopNavMobileMenuLinks.module.scss';

interface Props {
  links: TopNavLink[];
}

const TopNavMobileMenuLinks = ({ links }: Props) => {
  const enabledLinks = links.filter((link) => link.isEnabled);

  return (
    <div className={styles.mobileMenuLinks}>
      {enabledLinks.map(({ label, routePath }, index) => (
        <TopNavMobileMenuLink
          key={label}
          routePath={routePath}
          isUnderlined={index < enabledLinks.length - 1}
        >
          {label}
        </TopNavMobileMenuLink>
      ))}
    </div>
  );
};

export default TopNavMobileMenuLinks;

import { ReactNode } from 'react';
import classNames from 'classnames';

import { RoutePath } from '@/app/entities';
import { usePathname } from 'next/navigation';
import TransitionLink from '../TransitionLink/TransitionLink';
import SlideUpText from '../SlideUpText/SlideUpText';

import styles from './TopNavLink.module.scss';

interface Props {
  children: ReactNode;
  routePath: RoutePath;
  hoveredLink: RoutePath | null;
  onHover: (routePath: RoutePath | null) => void;
}

const TopNavLink = ({ children, routePath, hoveredLink, onHover }: Props) => {
  const pathname = usePathname();

  return (
    <li
      className={classNames({
        [styles.navLink]: true,
        [styles.selected]: routePath === pathname,
      })}
      onMouseEnter={() => onHover(routePath)}
      onMouseLeave={() => onHover(null)}
    >
      <TransitionLink href={routePath}>
        <SlideUpText playAnimation={hoveredLink === routePath}>{children}</SlideUpText>
      </TransitionLink>
    </li>
  );
};

export default TopNavLink;

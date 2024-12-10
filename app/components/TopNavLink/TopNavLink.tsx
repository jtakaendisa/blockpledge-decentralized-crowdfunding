import classNames from 'classnames';
import styles from './TopNavLink.module.scss';
import { usePathname } from 'next/navigation';
import TransitionLink from '../TransitionLink/TransitionLink';
import SlideUpText from '../SlideUpText/SlideUpText';
import { ReactNode } from 'react';
import { RoutePath } from '@/app/entities';

interface Props {
  children: ReactNode;
  routePath: RoutePath;
  hoveredLink: RoutePath | null;
  onHover: (routePath: RoutePath | null) => void;
  onComplete: () => void;
}

const TopNavLink = ({
  children,
  routePath,
  hoveredLink,
  onHover,
  onComplete,
}: Props) => {
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
      <TransitionLink href={routePath} onComplete={onComplete}>
        <SlideUpText playAnimation={hoveredLink === routePath}>{children}</SlideUpText>
      </TransitionLink>
    </li>
  );
};

export default TopNavLink;

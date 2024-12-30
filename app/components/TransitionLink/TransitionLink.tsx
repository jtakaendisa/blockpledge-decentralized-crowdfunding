'use client';

import { ReactNode, MouseEvent } from 'react';
import Link from 'next/link';

import { RoutePath } from '@/app/entities';
import usePageNavigation from '@/app/hooks/usePageNavigation';

import styles from './TransitionLink.module.scss';

interface Props {
  href: RoutePath;
  children: ReactNode;
}

const TransitionLink = ({ href, children }: Props) => {
  const { animatePageOut } = usePageNavigation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    animatePageOut(href);
  };

  return (
    <Link onClick={handleClick} href={href} className={styles.link}>
      {children}
    </Link>
  );
};

export default TransitionLink;

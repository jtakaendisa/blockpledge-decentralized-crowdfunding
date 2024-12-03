'use client';

import { ReactNode, MouseEvent } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { RoutePath } from '@/app/entities';
import usePageNavigation from '@/app/hooks/usePageNavigation';

import styles from './TransitionLink.module.scss';

interface Props {
  href: RoutePath;
  children: ReactNode;
  onComplete?: () => void;
}

const TransitionLink = ({ href, children, onComplete }: Props) => {
  const pathname = usePathname();

  const { animatePageOut } = usePageNavigation();

  const handleClick = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    e.preventDefault();

    if (pathname !== href) {
      animatePageOut(href);
      onComplete?.();
    }
  };

  return (
    <Link onClick={handleClick} href={href} className={styles.link}>
      {children}
    </Link>
  );
};

export default TransitionLink;

'use client';

import { PropsWithChildren, useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { pathnameMap } from './constants';
import usePageNavigation from './hooks/usePageNavigation';

import styles from './template.module.scss';

const Template = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  const { animatePageIn } = usePageNavigation();

  useEffect(() => {
    animatePageIn();
  }, [animatePageIn]);

  return (
    <>
      {/* Main Content */}
      <div id="pt-page">{children}</div>

      {/* Page Transition Blocks */}
      <div className={styles.blocks}>
        {Array.from({ length: 10 }).map((_, rowIndex) => (
          <div key={rowIndex} className={styles.row}>
            {Array.from({ length: 11 }).map((_, columnIndex) => (
              <div
                key={columnIndex}
                id={`row-${rowIndex}-column-${columnIndex}`}
                className={styles.column}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Animated Route Name */}
      <p id="pt-route" className={styles.route}>
        {pathnameMap[pathname as keyof typeof pathnameMap]}
      </p>
    </>
  );
};

export default Template;

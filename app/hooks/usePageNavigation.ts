import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useTransitionRouter } from 'next-transition-router';
import { animate, useAnimate } from 'framer-motion';

import { RoutePath } from '../entities';
import { pathnameMap } from '../constants';
import { sleep } from '../utils';

const calculateRandomBlockDelay = (rowIndex: number, totalRows?: number) => {
  const blockDelay = Math.random() * 0.5;
  const rowDelay = ((totalRows || 10) - rowIndex - 1) * 0.05;
  return blockDelay + rowDelay;
};

const animateBlocks = (rows: number, columns: number, animationType: 'in' | 'out') => {
  Array.from({ length: rows }).map((_, rowIndex) => {
    Array.from({ length: columns }).map((_, columnIndex) => {
      const block = document.getElementById(`row-${rowIndex}-column-${columnIndex}`);

      if (!block) return;

      block.style.transformOrigin = animationType === 'in' ? 'top' : 'bottom';

      animate(
        block,
        { scaleY: animationType === 'in' ? [1, 0] : [0, 1] },
        {
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
          delay: calculateRandomBlockDelay(rowIndex),
        }
      );
    });
  });
};

export const usePageNavigation = () => {
  const router = useRouter();
  const transitionRouter = useTransitionRouter();
  const pathname = usePathname();
  const [_, animate] = useAnimate();

  const navigateToPage = useCallback((href: RoutePath) => router.push(href), [router]);

  const navigateToPageWithTransition = useCallback(
    (href: RoutePath) => transitionRouter.push(href),
    [transitionRouter]
  );

  const animatePageOut = useCallback(
    async (href: RoutePath) => {
      const page = document.getElementById('pt-page');
      const blocks = document.getElementById('pt-blocks');
      const route = document.getElementById('pt-route');

      if (!page || !blocks || !route) return;

      blocks.style.display = 'flex';
      route.style.display = 'block';
      route.textContent = pathnameMap[href.split('?')[0] as keyof typeof pathnameMap];

      await Promise.all([
        animate(page, { opacity: 0.5 }, { duration: 1 }),
        animate(route, { opacity: 1 }, { duration: 1, delay: 0.3 }),
        animate(
          route,
          { top: ['48%', '40%'] },
          { duration: 1, delay: 0.3, ease: [0.76, 0, 0.24, 1] }
        ),
        animateBlocks(10, 11, 'out'),
        sleep(1800),
      ]).catch((error) => {
        console.log(error);
      });
    },
    [animate]
  );

  const animatePageIn = useCallback(async () => {
    const page = document.getElementById('pt-page');
    const blocks = document.getElementById('pt-blocks');
    const route = document.getElementById('pt-route');

    if (!page || !blocks || !route) return;

    route.textContent = pathnameMap[pathname.split('?')[0] as keyof typeof pathnameMap];

    await Promise.all([
      animate(page, { opacity: [0.5, 1] }, { duration: 1, delay: 0.5 }),
      animate(route, { opacity: [1, 0] }, { duration: 1, delay: 0.1 }),
      animate(route, { top: ['40%', '32%'] }, { duration: 1 }),
      animateBlocks(10, 11, 'in'),
    ])
      .then(() => {
        blocks.style.display = 'none';
        route.style.display = 'none';
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pathname, animate]);

  return {
    navigateToPage,
    navigateToPageWithTransition,
    animatePageIn,
    animatePageOut,
  };
};

'use client';

import { TransitionRouter } from 'next-transition-router';

import { RoutePath } from './entities';
import { usePageNavigation } from './hooks/usePageNavigation';

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const { animatePageOut, animatePageIn } = usePageNavigation();

  return (
    <TransitionRouter
      leave={async (next, from, to) => {
        if (from === to) {
          return;
        }

        await animatePageOut(to as RoutePath);
        next();
      }}
      enter={async (next) => {
        await animatePageIn();
        next();
      }}
    >
      {children}
    </TransitionRouter>
  );
}

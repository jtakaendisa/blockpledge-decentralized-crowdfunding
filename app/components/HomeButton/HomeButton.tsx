'use client';

import { Link as TransitionLink } from 'next-transition-router';
import Coin from '../icons/Coin';

import styles from './HomeButton.module.scss';

interface Props {
  scale?: number;
}

const HomeButton = ({ scale = 1 }: Props) => {
  const homeButtonRef = (element: HTMLDivElement | null) => {
    if (element) {
      element.style.setProperty('--scale', scale.toString());
    }
  };

  return (
    <TransitionLink className={styles.homeButton} href="/">
      <div ref={homeButtonRef} className={styles.row}>
        <span className={styles.text}>BlockPledge</span>
        <span className={styles.icon}>
          <Coin />
        </span>
      </div>
    </TransitionLink>
  );
};

export default HomeButton;

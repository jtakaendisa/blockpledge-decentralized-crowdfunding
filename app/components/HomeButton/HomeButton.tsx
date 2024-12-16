'use client';

import TransitionLink from '../TransitionLink/TransitionLink';
import Coin from '../categories/icons/Coin';

import styles from './HomeButton.module.scss';

interface Props {
  scale?: number;
}

const HomeButton = ({ scale }: Props) => {
  const homeButtonRef = (element: HTMLDivElement | null) => {
    if (element && scale) {
      element.style.setProperty('--scale', scale.toString());
    }
  };

  return (
    <TransitionLink href="/">
      <div ref={homeButtonRef} className={styles.homeButton}>
        <span className={styles.text}>BlockPledge</span>

        <span className={styles.icon}>
          <Coin />
        </span>
      </div>
    </TransitionLink>
  );
};

export default HomeButton;

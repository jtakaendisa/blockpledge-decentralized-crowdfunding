'use client';

import TransitionLink from '../TransitionLink/TransitionLink';
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

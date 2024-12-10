import TransitionLink from '../TransitionLink/TransitionLink';
import Coin from '../categories/icons/Coin';

import styles from './TopNavHomeButton.module.scss';

const TopNavHomeButton = () => {
  return (
    <TransitionLink href="/">
      <div className={styles.homeIcon}>
        <span>BlockPledge</span>
        <Coin />
      </div>
    </TransitionLink>
  );
};

export default TopNavHomeButton;

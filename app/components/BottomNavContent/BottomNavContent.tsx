import Heart from '../icons/Heart';
import BottomNavSocials from '../BottomNavSocials/BottomNavSocials';

import styles from './BottomNavContent.module.scss';

const BottomNavContent = () => {
  return (
    <div className={styles.content}>
      <span className={styles.text}>
        Made with <Heart fill="#f55656" /> by James Takaendisa
      </span>
      &#8226;
      <BottomNavSocials />
    </div>
  );
};

export default BottomNavContent;

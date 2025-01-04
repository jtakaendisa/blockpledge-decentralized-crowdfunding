import { colors } from '@/app/constants';
import Heart from '../icons/Heart';
import BottomNavSocials from '../BottomNavSocials/BottomNavSocials';

import styles from './BottomNavContent.module.scss';

const { red } = colors;

const BottomNavContent = () => {
  return (
    <div className={styles.content}>
      <span className={styles.text}>
        Made with <Heart fill={red} size={16} /> by James Takaendisa
      </span>
      &#8226;
      <BottomNavSocials />
    </div>
  );
};

export default BottomNavContent;

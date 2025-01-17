import BottomNavContent from '../BottomNavContent/BottomNavContent';
import HomeButton from '../../HomeButton/HomeButton';
import styles from './BottomNav.module.scss';

const BottomNav = () => {
  return (
    <footer className={styles.footer}>
      <HomeButton scale={1.35} />
      <BottomNavContent />
    </footer>
  );
};

export default BottomNav;

import Link from 'next/link';
import { TbBusinessplan } from 'react-icons/tb';

import styles from './Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.home}>
        <TbBusinessplan />
        <span>Genesis</span>
      </Link>
      <div className={styles.button}>Connect Wallet</div>
    </header>
  );
};

export default Header;

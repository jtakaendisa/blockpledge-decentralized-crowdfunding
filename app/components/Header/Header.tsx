import Link from 'next/link';
import { TbBusinessplan } from 'react-icons/tb';

import styles from './Header.module.scss';
import Button from '../Button/Button';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.home}>
        <span>Genesis</span>
        <TbBusinessplan />
      </Link>
      <Button>Connect Wallet</Button>
    </header>
  );
};

export default Header;

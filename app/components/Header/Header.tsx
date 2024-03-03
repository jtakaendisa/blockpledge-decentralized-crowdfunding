'use client';

import Link from 'next/link';
import { TbBusinessplan } from 'react-icons/tb';

import { useAccountStore } from '@/app/store';
import useBlockchain from '@/app/hooks/useBlockchain';
import Button from '../Button/Button';

import styles from './Header.module.scss';
import { useEffect } from 'react';

const Header = () => {
  const { connectWallet, checkConnection } = useBlockchain();
  const connectedAccount = useAccountStore((s) => s.connectedAccount);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.home}>
        <span>BlockPledge</span>
        <TbBusinessplan />
      </Link>
      <Button onClick={connectWallet} disabled={connectedAccount.length > 0}>
        {connectedAccount
          ? `${connectedAccount.slice(0, 4)}...${connectedAccount.slice(38, 42)}`
          : 'Connect Wallet'}
      </Button>
    </header>
  );
};

export default Header;

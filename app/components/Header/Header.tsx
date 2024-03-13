'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { TbBusinessplan } from 'react-icons/tb';

import { useAccountStore } from '@/app/store';
import { truncateAccount } from '@/app/utils/index';
import useBlockchain from '@/app/hooks/useBlockchain';
import Button from '../Button/Button';

import styles from './Header.module.scss';

const Header = () => {
  const { connectWallet, getCategories } = useBlockchain();
  const connectedAccount = useAccountStore((s) => s.connectedAccount);
  const setConnectedAccount = useAccountStore((s) => s.setConnectedAccount);

  useEffect(() => {
    const fetchConnectedAccount = async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      }
    };

    const handleChainChange = () => {
      window.location.reload();
    };

    const handleAccountChange = async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setConnectedAccount(accounts[0]);
    };

    if (window.ethereum) {
      fetchConnectedAccount();
    }

    window.ethereum.on('accountsChanged', handleAccountChange);
    window.ethereum.on('chainChanged', handleChainChange);

    return () => {
      window.ethereum.removeListener('chainChanged', handleChainChange);
      window.ethereum.removeListener('accountsChanged', handleAccountChange);
    };
  }, [setConnectedAccount]);

  useEffect(() => {
    const fetchData = async () => {
      await getCategories();
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.home}>
        <span>BlockPledge</span>
        <TbBusinessplan />
      </Link>
      <Button onClick={connectWallet} disabled={connectedAccount.length > 0}>
        {connectedAccount ? truncateAccount(connectedAccount, 4, 4) : 'Connect Wallet'}
      </Button>
    </header>
  );
};

export default Header;

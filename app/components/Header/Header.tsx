'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TbBusinessplan } from 'react-icons/tb';

import { useAccountStore } from '@/app/store';
import {
  authStateChangeListener,
  formatAuthUserData,
  signOutAuthUser,
} from '@/app/services/authService';
import { truncateAccount } from '@/app/utils/index';
import useBlockchain from '@/app/hooks/useBlockchain';
import Button from '../Button/Button';

import styles from './Header.module.scss';
import { User } from 'firebase/auth';

const Header = () => {
  const router = useRouter();
  const { connectWallet, getCategories } = useBlockchain();
  const connectedAccount = useAccountStore((s) => s.connectedAccount);
  const setConnectedAccount = useAccountStore((s) => s.setConnectedAccount);
  const authUser = useAccountStore((s) => s.authUser);
  const setAuthUser = useAccountStore((s) => s.setAuthUser);

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

  useEffect(() => {
    const unsubscribe = authStateChangeListener(async (user: User) => {
      const formattedAuthUser = await formatAuthUserData(user);
      setAuthUser(formattedAuthUser);
    });

    return unsubscribe;
  }, [setAuthUser]);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.home}>
        <span>BlockPledge</span>
        <TbBusinessplan />
      </Link>
      <div className={styles.buttonContainer}>
        {authUser ? (
          <Button inverted onClick={signOutAuthUser}>
            Sign out
          </Button>
        ) : (
          <Button inverted onClick={() => router.push('/auth')}>
            Sign In
          </Button>
        )}
        <Button onClick={connectWallet} disabled={connectedAccount.length > 0}>
          {connectedAccount
            ? truncateAccount(connectedAccount, 4, 4)
            : 'Connect Wallet'}
        </Button>
      </div>
    </header>
  );
};

export default Header;

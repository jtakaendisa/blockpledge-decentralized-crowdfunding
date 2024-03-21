'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User } from 'firebase/auth';
import { TbBusinessplan } from 'react-icons/tb';

import { useAccountStore, useProjectStore } from '@/app/store';
import {
  authStateChangeListener,
  formatAuthUserData,
  signOutAuthUser,
} from '@/app/services/authService';
import { truncateAccount } from '@/app/utils/index';
import useBlockchain from '@/app/hooks/useBlockchain';
import Button from '../Button/Button';

import styles from './Header.module.scss';

const Header = () => {
  const router = useRouter();
  const { connectWallet } = useBlockchain();
  const connectedAccount = useAccountStore((s) => s.connectedAccount);
  const setConnectedAccount = useAccountStore((s) => s.setConnectedAccount);
  const authUser = useAccountStore((s) => s.authUser);
  const setAuthUser = useAccountStore((s) => s.setAuthUser);
  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);

  const isAdmin = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_UID;

  const handleWalletConnection = useCallback(async () => {
    const { accounts } = await connectWallet();

    if (accounts.length) {
      setConnectedAccount(accounts[0]);
    }
  }, [connectWallet, setConnectedAccount]);

  useEffect(() => {
    const handleChainChange = () => {
      window.location.reload();
    };

    if (window.ethereum) {
      handleWalletConnection();
    }

    window.ethereum.on('accountsChanged', handleWalletConnection);
    window.ethereum.on('chainChanged', handleChainChange);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleWalletConnection);
      window.ethereum.removeListener('chainChanged', handleChainChange);
    };
  }, [handleWalletConnection, connectWallet, setConnectedAccount]);

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
        <Link href="/projects" onClick={() => setSelectedCategory(null)}>
          Explore Projects
        </Link>
        {authUser && !isAdmin && (
          <Link href="/user_dashboard" onClick={() => setSelectedCategory(null)}>
            My Dashboard
          </Link>
        )}
        {isAdmin && (
          <Button inverted onClick={() => router.push('/admin_dashboard')}>
            Admin Dashboard
          </Button>
        )}
        {authUser ? (
          <Button inverted onClick={signOutAuthUser}>
            Sign out
          </Button>
        ) : (
          <Button inverted onClick={() => router.push('/auth')}>
            Sign In
          </Button>
        )}
        <Button onClick={handleWalletConnection} disabled={connectedAccount.length > 0}>
          {connectedAccount
            ? truncateAccount(connectedAccount, 4, 4)
            : 'Connect Wallet'}
        </Button>
      </div>
    </header>
  );
};

export default Header;

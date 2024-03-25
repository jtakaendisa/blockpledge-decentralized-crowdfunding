'use client';

import { useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { User } from 'firebase/auth';
import classNames from 'classnames';

import { useAccountStore, useProjectStore } from '@/app/store';
import {
  authStateChangeListener,
  formatAuthUserData,
  signOutAuthUser,
} from '@/app/services/authService';
import useBlockchain from '@/app/hooks/useBlockchain';
import DropdownMenu from '../DropdownMenu/DropdownMenu';
import Button from '../Button/Button';
import coinSVG from '@/public/icons/coin.svg';

import styles from './Header.module.scss';

interface Props {
  refreshUi?: boolean;
}

const PATHS = {
  home: '/',
  projects: '/projects',
  userDashboard: '/user_dashboard',
  adminDashboard: '/admin_dashboard',
};

const Header = ({ refreshUi }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const connectedAccount = useAccountStore((s) => s.connectedAccount);
  const authUser = useAccountStore((s) => s.authUser);
  const setConnectedAccount = useAccountStore((s) => s.setConnectedAccount);
  const setAuthUser = useAccountStore((s) => s.setAuthUser);
  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);
  const { connectWallet } = useBlockchain();

  const isAdmin = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_UID;

  const handleWalletConnection = useCallback(async () => {
    if (!window?.ethereum) return;

    const { accounts } = await connectWallet();

    if (accounts.length) {
      setConnectedAccount(accounts[0]);
    }
  }, [connectWallet, setConnectedAccount]);

  useEffect(() => {
    const handleChainChange = () => {
      window.location.reload();
    };

    window.ethereum.on('accountsChanged', handleWalletConnection);
    window.ethereum.on('chainChanged', handleChainChange);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleWalletConnection);
      window.ethereum.removeListener('chainChanged', handleChainChange);
    };
  }, [handleWalletConnection]);

  useEffect(() => {
    const unsubscribe = authStateChangeListener(async (user: User) => {
      const formattedAuthUser = await formatAuthUserData(user);
      setAuthUser(formattedAuthUser);
    });

    return unsubscribe;
  }, [refreshUi, setAuthUser]);

  return (
    <header className={styles.header}>
      <Link href={PATHS.home} className={styles.homeIcon}>
        <span>BlockPledge</span>
        <Image src={coinSVG} alt="coin logo" width={22} height={22} />
      </Link>
      <li className={styles.navLinks}>
        <ul
          className={classNames({
            [styles.navLink]: true,
            [styles.selected]: PATHS.projects === pathname,
          })}
        >
          <Link href={PATHS.projects} onClick={() => setSelectedCategory(null)}>
            Explore Projects
          </Link>
        </ul>
        {authUser && !isAdmin && (
          <ul
            className={classNames({
              [styles.navLink]: true,
              [styles.selected]: PATHS.userDashboard === pathname,
            })}
          >
            <Link href={PATHS.userDashboard} onClick={() => setSelectedCategory(null)}>
              My Dashboard
            </Link>
          </ul>
        )}
        {isAdmin && (
          <ul
            className={classNames({
              [styles.navLink]: true,
              [styles.selected]: PATHS.adminDashboard === pathname,
            })}
          >
            <Link href={PATHS.adminDashboard} onClick={() => setSelectedCategory(null)}>
              Admin Dashboard
            </Link>
          </ul>
        )}
        {authUser ? (
          <ul className={styles.profileContainer}>
            <DropdownMenu
              authUser={authUser}
              connectedAccount={connectedAccount}
              onConnectWallet={handleWalletConnection}
              onSignOut={signOutAuthUser}
            />
          </ul>
        ) : (
          <ul>
            <Button inverted onClick={() => router.push('/auth')}>
              Sign In
            </Button>
          </ul>
        )}
      </li>
    </header>
  );
};

export default Header;

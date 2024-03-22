'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { User } from 'firebase/auth';
import classNames from 'classnames';
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
import userSVG from '@/public/icons/user.svg';
import walletSVG from '@/public/icons/wallet.svg';

import styles from './Header.module.scss';

const PATHS = {
  home: '/',
  projects: '/projects',
  userDashboard: '/user_dashboard',
  adminDashboard: '/admin_dashboard',
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const connectedAccount = useAccountStore((s) => s.connectedAccount);
  const authUser = useAccountStore((s) => s.authUser);
  const setConnectedAccount = useAccountStore((s) => s.setConnectedAccount);
  const setAuthUser = useAccountStore((s) => s.setAuthUser);
  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);
  const { connectWallet } = useBlockchain();
  const [isOpen, setIsOpen] = useState(false);

  const isAdmin = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_UID;

  useEffect(() => {
    const handleWalletConnection = async () => {
      const { accounts } = await connectWallet();

      if (accounts.length) {
        setConnectedAccount(accounts[0]);
      }
    };

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
  }, [connectWallet, setConnectedAccount]);

  useEffect(() => {
    const unsubscribe = authStateChangeListener(async (user: User) => {
      const formattedAuthUser = await formatAuthUserData(user);
      setAuthUser(formattedAuthUser);
    });

    return unsubscribe;
  }, [setAuthUser]);

  return (
    <header className={styles.header}>
      <Link href={PATHS.home} className={styles.homeIcon}>
        <span>BlockPledge</span>
        <TbBusinessplan />
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
          <ul
            className={styles.profileContainer}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div className={styles.iconContainer}>
              <Image src={userSVG} alt="User Profile" width={24} height={24} />
            </div>
            {isOpen && (
              <div className={styles.dropDownMenu}>
                <div className={styles.row}>
                  <div className={styles.iconContainer}>
                    <Image src={userSVG} alt="User Profile" width={24} height={24} />
                  </div>
                  <span>{authUser.email}</span>
                </div>
                <div className={styles.row}>
                  <div className={styles.iconContainer}>
                    <Image src={walletSVG} alt="Crypto Wallet" width={24} height={24} />
                  </div>
                  <span>{truncateAccount(connectedAccount, 4, 4)}</span>
                </div>
                <div className={styles.signOutButtonContainer}>
                  <Button onClick={signOutAuthUser}>Sign out</Button>
                </div>
              </div>
            )}
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

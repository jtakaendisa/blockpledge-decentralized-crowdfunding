'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { User } from 'firebase/auth';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';

import { useAccountStore, useProjectStore } from '@/app/store';
import {
  authStateChangeListener,
  formatAuthUserData,
  signOutAuthUser,
} from '@/app/services/authService';
import useBlockchain from '@/app/hooks/useBlockchain';
import { Media, MediaContextProvider } from '@/app/media';
import AuthDropdownMenu from '../AuthDropdownMenu/AuthDropdownMenu';
import MobileDropdownMenu from '../MobileDropdownMenu/MobileDropdownMenu';
import FlipButton from '../FlipButton/FlipButton';
import SlideUpText from '../SlideUpText/SlideUpText';
import Coin from '../categories/icons/Coin';

import styles from './Header.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const PATHS = {
  home: '/',
  projects: '/projects',
  userDashboard: '/user_dashboard',
  adminDashboard: '/admin_dashboard',
};

type NavLink = keyof typeof PATHS | null;

const Header = () => {
  const pathname = usePathname();
  const connectedAccount = useAccountStore((s) => s.connectedAccount);
  const authUser = useAccountStore((s) => s.authUser);
  const updatingAuthUserData = useAccountStore((s) => s.updatingAuthUserData);
  const setConnectedAccount = useAccountStore((s) => s.setConnectedAccount);
  const setAuthUser = useAccountStore((s) => s.setAuthUser);
  const setProjects = useProjectStore((s) => s.setProjects);
  const setStats = useProjectStore((s) => s.setStats);
  const setCategories = useProjectStore((s) => s.setCategories);
  const setSelectedCategory = useProjectStore((s) => s.setSelectedCategory);
  const setUpdatingFollowStatus = useProjectStore((s) => s.setUpdatingFollowStatus);

  const { connectWallet, getProjects, getCategories, listenForEvents } =
    useBlockchain();

  const [hoveredLink, setHoveredLink] = useState<NavLink>(null);

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [refreshUi, setRefreshUi] = useState(false);

  const isAdmin = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_UID;

  const handleWalletConnection = useCallback(async () => {
    if (!window?.ethereum) return;

    const { accounts } = await connectWallet();

    if (accounts.length) {
      setConnectedAccount(accounts[0]);
    }
  }, [connectWallet, setConnectedAccount]);

  const handleLinkHover = (hoveredLink: NavLink) => setHoveredLink(hoveredLink);

  const resetSelectedCategory = () => setSelectedCategory(null);

  useEffect(() => {
    const handleChainChange = () => {
      window.location.reload();
    };

    handleWalletConnection();

    window.ethereum.on('accountsChanged', handleWalletConnection);
    window.ethereum.on('chainChanged', handleChainChange);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleWalletConnection);
      window.ethereum.removeListener('chainChanged', handleChainChange);
    };
  }, [handleWalletConnection]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { projects, stats } = await getProjects();
        const { categories } = await getCategories();

        setProjects(projects);
        setStats(stats);
        setCategories(categories);
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    fetchData();
  }, [refreshUi, getProjects, getCategories, setProjects, setStats, setCategories]);

  useEffect(() => {
    setLoadingAuth(true);
    const unsubscribe = authStateChangeListener(async (user: User) => {
      const formattedAuthUser = await formatAuthUserData(user);
      setAuthUser(formattedAuthUser);
      setLoadingAuth(false);
      setUpdatingFollowStatus(false);
    });

    return unsubscribe;
  }, [updatingAuthUserData, setAuthUser, setUpdatingFollowStatus]);

  useEffect(() => {
    const unsubscribe = listenForEvents(() => setRefreshUi((prev) => !prev));

    return () => {
      unsubscribe.then((cleanup) => cleanup());
    };
  }, [listenForEvents]);

  return (
    <MediaContextProvider>
      <header className={styles.header}>
        <Link href={PATHS.home} className={styles.homeIcon}>
          <span>BlockPledge</span>
          <Coin />
        </Link>
        <div className={styles.navActions}>
          <Media greaterThanOrEqual="sm">
            <ul className={styles.navLinks}>
              {loadingAuth && !authUser && <Skeleton width={110} height={16} />}
              {authUser && !isAdmin && (
                <li
                  className={classNames({
                    [styles.navLink]: true,
                    [styles.selected]: PATHS.userDashboard === pathname,
                  })}
                  onMouseEnter={() => handleLinkHover('userDashboard')}
                  onMouseLeave={() => handleLinkHover(null)}
                >
                  <Link href={PATHS.userDashboard} onClick={resetSelectedCategory}>
                    <SlideUpText playAnimation={hoveredLink === 'userDashboard'}>
                      My Dashboard
                    </SlideUpText>
                  </Link>
                </li>
              )}
              {loadingAuth && !authUser && <Skeleton circle width={40} height={40} />}
              {isAdmin && (
                <li
                  className={classNames({
                    [styles.navLink]: true,
                    [styles.selected]: PATHS.adminDashboard === pathname,
                  })}
                  onMouseEnter={() => handleLinkHover('adminDashboard')}
                  onMouseLeave={() => handleLinkHover(null)}
                >
                  <Link href={PATHS.adminDashboard} onClick={resetSelectedCategory}>
                    <SlideUpText playAnimation={hoveredLink === 'adminDashboard'}>
                      Admin Dashboard
                    </SlideUpText>
                  </Link>
                </li>
              )}
              <li
                className={classNames({
                  [styles.navLink]: true,
                  [styles.selected]: PATHS.projects === pathname,
                })}
                onMouseEnter={() => handleLinkHover('projects')}
                onMouseLeave={() => handleLinkHover(null)}
              >
                <Link href={PATHS.projects} onClick={resetSelectedCategory}>
                  <SlideUpText playAnimation={hoveredLink === 'projects'}>
                    Explore Projects
                  </SlideUpText>
                </Link>
              </li>
            </ul>
          </Media>
          <Media lessThan="sm">
            <div className={styles.dropdownMenuContainer}>
              <MobileDropdownMenu authUser={authUser} isAdmin={isAdmin} />
            </div>
          </Media>
          <div className={styles.dropdownMenuContainer}>
            {authUser ? (
              <AuthDropdownMenu
                authUser={authUser}
                connectedAccount={connectedAccount}
                onConnectWallet={handleWalletConnection}
                onSignOut={signOutAuthUser}
              />
            ) : (
              !loadingAuth && <FlipButton href="/auth">Sign In</FlipButton>
            )}
          </div>
        </div>
      </header>
    </MediaContextProvider>
  );
};

export default Header;

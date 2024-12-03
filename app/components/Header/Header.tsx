'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { User } from 'firebase/auth';
import classNames from 'classnames';
import Skeleton from 'react-loading-skeleton';

import { useAccountStore, useProjectStore } from '@/app/store';
import { RoutePath } from '@/app/entities';
import { routes } from '@/app/constants';
import {
  authStateChangeListener,
  formatAuthUserData,
  signOutAuthUser,
} from '@/app/services/authService';
import useBlockchain from '@/app/hooks/useBlockchain';
import usePageNavigation from '@/app/hooks/usePageNavigation';
import { Media, MediaContextProvider } from '@/app/media';
import TransitionLink from '../TransitionLink/TransitionLink';
import AuthDropdownMenu from '../AuthDropdownMenu/AuthDropdownMenu';
import MobileDropdownMenu from '../MobileDropdownMenu/MobileDropdownMenu';
import FlipButton from '../FlipButton/FlipButton';
import SlideUpText from '../SlideUpText/SlideUpText';
import Coin from '../categories/icons/Coin';

import styles from './Header.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

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

  const { animatePageOut } = usePageNavigation();

  const [hoveredLink, setHoveredLink] = useState<RoutePath | null>(null);

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

  const handleLinkHover = (hoveredLink: RoutePath | null) =>
    setHoveredLink(hoveredLink);

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
        <TransitionLink href="/">
          <div className={styles.homeIcon}>
            <span>BlockPledge</span>
            <Coin />
          </div>
        </TransitionLink>
        <div className={styles.navActions}>
          <Media greaterThanOrEqual="sm">
            <ul className={styles.navLinks}>
              {loadingAuth && !authUser && <Skeleton width={110} height={16} />}
              {authUser && !isAdmin && (
                <li
                  className={classNames({
                    [styles.navLink]: true,
                    [styles.selected]: routes.userDashboard === pathname,
                  })}
                  onMouseEnter={() => handleLinkHover('/user_dashboard')}
                  onMouseLeave={() => handleLinkHover(null)}
                >
                  <TransitionLink
                    href="/user_dashboard"
                    onComplete={resetSelectedCategory}
                  >
                    <SlideUpText playAnimation={hoveredLink === '/user_dashboard'}>
                      My Dashboard
                    </SlideUpText>
                  </TransitionLink>
                </li>
              )}
              {loadingAuth && !authUser && <Skeleton circle width={40} height={40} />}
              {isAdmin && (
                <li
                  className={classNames({
                    [styles.navLink]: true,
                    [styles.selected]: routes.adminDashboard === pathname,
                  })}
                  onMouseEnter={() => handleLinkHover('/admin_dashboard')}
                  onMouseLeave={() => handleLinkHover(null)}
                >
                  <TransitionLink
                    href="/admin_dashboard"
                    onComplete={resetSelectedCategory}
                  >
                    <SlideUpText playAnimation={hoveredLink === '/admin_dashboard'}>
                      Admin Dashboard
                    </SlideUpText>
                  </TransitionLink>
                </li>
              )}
              <li
                className={classNames({
                  [styles.navLink]: true,
                  [styles.selected]: routes.projects === pathname,
                })}
                onMouseEnter={() => handleLinkHover('/projects')}
                onMouseLeave={() => handleLinkHover(null)}
              >
                <TransitionLink href="/projects" onComplete={resetSelectedCategory}>
                  <SlideUpText playAnimation={hoveredLink === '/projects'}>
                    Explore Projects
                  </SlideUpText>
                </TransitionLink>
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
              !loadingAuth && (
                <FlipButton
                  onClick={() => animatePageOut('/auth')}
                  backgroundColor1="transparent"
                >
                  Sign In
                </FlipButton>
              )
            )}
          </div>
        </div>
      </header>
    </MediaContextProvider>
  );
};

export default Header;

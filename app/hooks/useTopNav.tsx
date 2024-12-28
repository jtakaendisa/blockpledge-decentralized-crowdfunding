import { useCallback, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { RoutePath } from '../entities';
import { useAccountStore, useProjectStore } from '../store';
import { authStateChangeListener, formatAuthUserData } from '../services/authService';
import useBlockchain from './useBlockchain';

const useTopNav = () => {
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

  const [hoveredLink, setHoveredLink] = useState<RoutePath | null>(null);

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [refreshUi, setRefreshUi] = useState(false);

  const isAdmin = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_UID;
  const isAuthenticating = loadingAuth && !authUser;

  const handleWalletConnection = useCallback(async () => {
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

  return {
    isAdmin,
    isAuthenticating,
    connectedAccount,
    authUser,
    loadingAuth,
    hoveredLink,
    handleLinkHover,
    resetSelectedCategory,
    handleWalletConnection,
  };
};

export default useTopNav;

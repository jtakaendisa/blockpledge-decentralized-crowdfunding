import { useCallback, useEffect, useState } from 'react';
import { User } from 'firebase/auth';

import { useAccountStore, useProjectStore } from '../store';
import { routes } from '../constants';
import { authStateChangeListener, formatAuthUserData } from '../services/authService';
import { useBlockchain } from './useBlockchain';

export const useTopNav = () => {
  const authUser = useAccountStore((s) => s.authUser);
  const updatingAuthUserData = useAccountStore((s) => s.updatingAuthUserData);
  const setConnectedAccount = useAccountStore((s) => s.setConnectedAccount);
  const setAuthUser = useAccountStore((s) => s.setAuthUser);
  const setUpdatingFollowStatus = useProjectStore((s) => s.setUpdatingFollowStatus);

  const { connectWallet, listenForEvents } = useBlockchain();

  const [loadingAuth, setLoadingAuth] = useState(false);
  const [refreshUi, setRefreshUi] = useState(false);

  const isAdmin = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_UID;
  const isAuthenticating = loadingAuth && !authUser;

  const links = [
    {
      label: 'Explore Projects',
      routePath: routes.projects,
      isEnabled: true,
    },
    {
      label: 'My Dashboard',
      routePath: routes.userDashboard,
      isEnabled: authUser && !isAdmin,
    },
    {
      label: 'Admin Dashboard',
      routePath: routes.adminDashboard,
      isEnabled: isAdmin,
    },
  ];

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

    handleWalletConnection();

    window.ethereum.on('accountsChanged', handleWalletConnection);
    window.ethereum.on('chainChanged', handleChainChange);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleWalletConnection);
      window.ethereum.removeListener('chainChanged', handleChainChange);
    };
  }, [handleWalletConnection]);

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
    links,
    isAuthenticating,
    authUser,
    loadingAuth,
    handleWalletConnection,
  };
};

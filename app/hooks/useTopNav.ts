import { useEffect, useState } from 'react';

import { routes } from '../constants';
import { useGlobalStateContext } from './useGlobalStateContext';
import { useBlockchain } from './useBlockchain';

export const useTopNav = () => {
  const { isLoadingAuth, authUser, handleWalletConnection } = useGlobalStateContext();
  const { listenForEvents } = useBlockchain();

  const [refreshUi, setRefreshUi] = useState(false);

  const isAdmin = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_UID;

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
    const unsubscribe = listenForEvents(() => setRefreshUi((prev) => !prev));

    return () => {
      unsubscribe.then((cleanup) => cleanup());
    };
  }, [listenForEvents]);

  return {
    isLoadingAuth,
    authUser,
    links,
    handleWalletConnection,
  };
};

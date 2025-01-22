import { routes } from '../constants';
import { useGlobalStateContext } from './useGlobalStateContext';

export const useTopNav = () => {
  const { isLoadingAuth, authUser } = useGlobalStateContext();

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

  return {
    isLoadingAuth,
    authUser,
    links,
  };
};

import { useRouter } from 'next/navigation';

import { RouteKey } from '../entities';
import { routes } from '../constants';

const usePageNavigation = () => {
  const router = useRouter();

  const navigateToPage = (routeKey: RouteKey) => router.push(routes[routeKey]);

  return { navigateToPage };
};

export default usePageNavigation;

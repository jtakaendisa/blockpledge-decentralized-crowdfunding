import { Media } from '@/app/media';
import { RoutePath } from '@/app/entities';
import { AuthUser } from '@/app/store';
import { signOutAuthUser } from '@/app/services/authService';
import MobileDropdownMenu from '../MobileDropdownMenu/MobileDropdownMenu';
import AuthDropdownMenu from '../AuthDropdownMenu/AuthDropdownMenu';
import FlipButton from '../FlipButton/FlipButton';

import styles from './TopNavDropdownMenu.module.scss';

interface Props {
  authUser: AuthUser | null;
  connectedAccount: string;
  isAdmin: boolean;
  loadingAuth: boolean;
  onWalletConnect: () => void;
  onNavigate: (routePath: RoutePath) => void;
}

const TopNavDropdownMenu = ({
  authUser,
  connectedAccount,
  isAdmin,
  loadingAuth,
  onWalletConnect,
  onNavigate,
}: Props) => {
  return (
    <>
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
            onConnectWallet={onWalletConnect}
            onSignOut={signOutAuthUser}
          />
        ) : (
          !loadingAuth && (
            <FlipButton
              onClick={() => onNavigate('/auth')}
              backgroundColor1="transparent"
            >
              Sign In
            </FlipButton>
          )
        )}
      </div>
    </>
  );
};

export default TopNavDropdownMenu;

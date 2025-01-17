import { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';

import { AuthUser } from '@/app/entities';
import { signOutAuthUser } from '@/app/services/authService';
import { usePageNavigation } from '@/app/hooks/usePageNavigation';
import { useTopNavDropdownMenu } from '@/app/hooks/useTopNavDropdownMenu';
import TopNavAuthMenuButton from '../TopNavAuthMenuButton/TopNavAuthMenuButton';
import TopNavDropdownMenu from '../TopNavDropdownMenu/TopNavDropdownMenu';
import TopNavAuthMenuContent from '../TopNavAuthMenuContent/TopNavAuthMenuContent';
import FlipButton from '../../FlipButton/FlipButton';

import styles from './TopNavAuthMenu.module.scss';

interface Props {
  authUser: AuthUser | null;
  loadingAuth: boolean;
  isAuthenticating: boolean;
}

const TopNavAuthMenu = ({ authUser, loadingAuth, isAuthenticating }: Props) => {
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { animatePageOut } = usePageNavigation();
  const { isDropdownOpen, toggleDropdownOpenState } = useTopNavDropdownMenu(
    menuButtonRef,
    dropdownRef
  );

  const handleSignOut = () => {
    signOutAuthUser();
    animatePageOut('/');
  };

  return (
    <div className={styles.authMenu}>
      {!loadingAuth && !authUser && (
        <FlipButton
          onClick={() => animatePageOut('/auth')}
          backgroundColor1="transparent"
        >
          Sign In
        </FlipButton>
      )}

      {isAuthenticating && <Skeleton width={44} height={44} circle />}
      {authUser && (
        <TopNavAuthMenuButton ref={menuButtonRef} onClick={toggleDropdownOpenState} />
      )}

      <AnimatePresence>
        {authUser && isDropdownOpen && (
          <TopNavDropdownMenu ref={dropdownRef}>
            <TopNavAuthMenuContent authUser={authUser} onSignOut={handleSignOut} />
          </TopNavDropdownMenu>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopNavAuthMenu;

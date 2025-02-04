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
  isLoadingAuth: boolean;
  authUser: AuthUser | null;
}

const TopNavAuthMenu = ({ isLoadingAuth, authUser }: Props) => {
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { navigateToPageWithTransition } = usePageNavigation();
  const { isDropdownOpen, toggleDropdownOpenState } = useTopNavDropdownMenu(
    menuButtonRef,
    dropdownRef
  );

  const handleClick = () => navigateToPageWithTransition('/auth');

  const handleSignOut = () => {
    signOutAuthUser();
    navigateToPageWithTransition('/');
  };

  return (
    <div className={styles.authMenu}>
      {!isLoadingAuth && !authUser && (
        <FlipButton onClick={handleClick} backgroundColor1="transparent">
          Sign In
        </FlipButton>
      )}

      {isLoadingAuth && !authUser && <Skeleton width={44} height={44} circle />}
      {!isLoadingAuth && authUser && (
        <TopNavAuthMenuButton ref={menuButtonRef} onClick={toggleDropdownOpenState} />
      )}

      <AnimatePresence>
        {authUser && isDropdownOpen && (
          <TopNavDropdownMenu ref={dropdownRef}>
            <TopNavAuthMenuContent
              authUser={authUser}
              onSignOut={handleSignOut}
              onClose={toggleDropdownOpenState}
            />
          </TopNavDropdownMenu>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopNavAuthMenu;

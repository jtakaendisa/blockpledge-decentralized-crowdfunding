import { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import { AuthUser } from '@/app/store';
import { signOutAuthUser } from '@/app/services/authService';
import usePageNavigation from '@/app/hooks/usePageNavigation';
import useTopNavDropdownMenu from '@/app/hooks/useTopNavDropdownMenu';
import TopNavAuthMenuButton from '../TopNavAuthMenuButton/TopNavAuthMenuButton';
import TopNavDropdownMenu from '../TopNavDropdownMenu/TopNavDropdownMenu';
import TopNavAuthMenuContent from '../TopNavAuthMenuContent/TopNavAuthMenuContent';
import FlipButton from '../FlipButton/FlipButton';

import styles from './TopNavAuthMenu.module.scss';

interface Props {
  authUser: AuthUser | null;
  loadingAuth: boolean;
}

const TopNavAuthMenu = ({ authUser, loadingAuth }: Props) => {
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { animatePageOut } = usePageNavigation();
  const { isDropdownOpen, toggleDropdownOpenState } = useTopNavDropdownMenu(
    menuButtonRef,
    dropdownRef
  );

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

      {authUser && (
        <TopNavAuthMenuButton ref={menuButtonRef} onClick={toggleDropdownOpenState} />
      )}

      <AnimatePresence>
        {authUser && isDropdownOpen && (
          <TopNavDropdownMenu ref={dropdownRef}>
            <TopNavAuthMenuContent authUser={authUser} onSignOut={signOutAuthUser} />
          </TopNavDropdownMenu>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopNavAuthMenu;

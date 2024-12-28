import { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import { RoutePath } from '@/app/entities';
import { AuthUser } from '@/app/store';
import { signOutAuthUser } from '@/app/services/authService';
import useTopNavDropdownMenu from '@/app/hooks/useTopNavDropdownMenu';
import TopNavAuthMenuButton from '../TopNavAuthMenuButton/TopNavAuthMenuButton';
import TopNavDropdownMenu from '../TopNavDropdownMenu/TopNavDropdownMenu';
import TopNavAuthMenuContent from '../TopNavAuthMenuContent/TopNavAuthMenuContent';
import FlipButton from '../FlipButton/FlipButton';

import styles from './TopNavAuthMenu.module.scss';

interface Props {
  authUser: AuthUser | null;
  connectedAccount: string;
  loadingAuth: boolean;
  onNavigate: (routePath: RoutePath) => void;
}

const TopNavAuthMenu = ({
  authUser,
  connectedAccount,
  loadingAuth,
  onNavigate,
}: Props) => {
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isDropdownOpen, toggleDropdownOpenState } = useTopNavDropdownMenu(
    menuButtonRef,
    dropdownRef
  );

  return (
    <div className={styles.authMenu}>
      {!loadingAuth && !authUser && (
        <FlipButton onClick={() => onNavigate('/auth')} backgroundColor1="transparent">
          Sign In
        </FlipButton>
      )}

      {authUser && (
        <TopNavAuthMenuButton ref={menuButtonRef} onClick={toggleDropdownOpenState} />
      )}

      <AnimatePresence>
        {authUser && isDropdownOpen && (
          <TopNavDropdownMenu ref={dropdownRef}>
            <TopNavAuthMenuContent
              authUser={authUser}
              connectedAccount={connectedAccount}
              onSignOut={signOutAuthUser}
            />
          </TopNavDropdownMenu>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopNavAuthMenu;

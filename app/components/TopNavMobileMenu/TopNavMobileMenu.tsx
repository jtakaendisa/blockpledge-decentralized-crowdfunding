import { useRef } from 'react';
import { AnimatePresence } from 'framer-motion';

import { RoutePath, TopNavLink } from '@/app/entities';
import useTopNavDropdownMenu from '@/app/hooks/useTopNavDropdownMenu';
import TopNavMobileMenuButton from '../TopNavMobileMenuButton/TopNavMobileMenuButton';
import TopNavMobileMenuLinks from '../TopNavMobileMenuLinks/TopNavMobileMenuLinks';
import TopNavDropdownMenu from '../TopNavDropdownMenu/TopNavDropdownMenu';

import styles from './TopNavMobileMenu.module.scss';

interface Props {
  links: TopNavLink[];
  onNavigate: (routePath: RoutePath) => void;
}

const TopNavMobileMenu = ({ links, onNavigate }: Props) => {
  const menuButtonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isDropdownOpen, toggleDropdownOpenState } = useTopNavDropdownMenu(
    menuButtonRef,
    dropdownRef
  );

  return (
    <div className={styles.mobileMenu}>
      <TopNavMobileMenuButton ref={menuButtonRef} onClick={toggleDropdownOpenState} />

      <AnimatePresence>
        {isDropdownOpen && (
          <TopNavDropdownMenu ref={dropdownRef}>
            <TopNavMobileMenuLinks links={links} onNavigate={onNavigate} />
          </TopNavDropdownMenu>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TopNavMobileMenu;

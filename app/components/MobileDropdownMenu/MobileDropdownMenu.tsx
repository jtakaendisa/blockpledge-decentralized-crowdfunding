'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { AuthUser } from '@/app/store';

import styles from './MobileDropdownMenu.module.scss';

interface Props {
  authUser: AuthUser | null;
  isAdmin: boolean;
}

const AuthDropdownMenu = ({ authUser, isAdmin }: Props) => {
  const router = useRouter();
  const mobileMenuRef = useRef<HTMLSpanElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (
        mobileMenuRef.current &&
        dropdownRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <span
        ref={mobileMenuRef}
        className={styles.mobileMenu}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Menu
      </span>
      {isOpen && (
        <div ref={dropdownRef} className={styles.dropDownMenu}>
          <div className={styles.row}>
            <span onClick={() => router.push('/projects')}>Explore Projects</span>
          </div>
          <div className={styles.row}>
            {authUser && !isAdmin && (
              <span onClick={() => router.push('/user_dashboard')}>User Dashboard</span>
            )}
            {authUser && isAdmin && (
              <span onClick={() => router.push('/admin_dashboard')}>
                Admin Dashboard
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AuthDropdownMenu;

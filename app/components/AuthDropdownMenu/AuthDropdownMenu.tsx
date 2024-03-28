'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

import { AuthUser } from '@/app/store';
import { truncateAccount } from '@/app/utils';
import Button from '../Button/Button';
import User from '../categories/icons/User';
import userSVG from '@/public/icons/user.svg';
import walletSVG from '@/public/icons/wallet.svg';

import styles from './AuthDropdownMenu.module.scss';

interface Props {
  authUser: AuthUser;
  connectedAccount: string;
  onConnectWallet: () => void;
  onSignOut: () => void;
}

const AuthDropdownMenu = ({
  authUser,
  connectedAccount,
  onConnectWallet,
  onSignOut,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const profileIconRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (
        profileIconRef.current &&
        dropdownRef.current &&
        !profileIconRef.current.contains(e.target as Node) &&
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
      <div
        ref={profileIconRef}
        className={styles.iconContainer}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <User />
      </div>
      {isOpen && (
        <div ref={dropdownRef} className={styles.dropDownMenu}>
          <div className={styles.row}>
            <div className={styles.iconContainer}>
              <Image src={userSVG} alt="User Profile" width={24} height={24} />
            </div>
            <span>{authUser.email}</span>
          </div>
          <div className={styles.row}>
            <div className={styles.iconContainer}>
              <Image src={walletSVG} alt="Crypto Wallet" width={24} height={24} />
            </div>
            {connectedAccount ? (
              <span>{truncateAccount(connectedAccount, 4, 4)}</span>
            ) : (
              <Button onClick={onConnectWallet} inverted>
                Connect Wallet
              </Button>
            )}
          </div>
          <div className={styles.signOutButtonContainer}>
            <Button onClick={onSignOut}>Sign out</Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthDropdownMenu;

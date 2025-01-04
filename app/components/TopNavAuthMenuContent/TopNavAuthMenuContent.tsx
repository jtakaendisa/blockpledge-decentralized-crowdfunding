import { useAccountStore } from '@/app/store';
import { truncateAccount } from '@/app/utils';

import { AuthUser } from '@/app/entities';
import TopNavAuthMenuContentItem from '../TopNavAuthMenuContentItem/TopNavAuthMenuContentItem';
import FlipButton from '../FlipButton/FlipButton';
import Envelope from '../icons/Envelope';
import Wallet from '../icons/Wallet';

import styles from './TopNavAuthMenuContent.module.scss';

interface Props {
  authUser: AuthUser;
  onSignOut: () => void;
}

const TopNavAuthMenuContent = ({ authUser, onSignOut }: Props) => {
  const connectedAccount = useAccountStore((s) => s.connectedAccount);

  const contentItems = [
    {
      label: authUser.email!,
      icon: <Envelope size={28} />,
    },
    {
      label: truncateAccount(connectedAccount, 4, 4),
      icon: <Wallet size={28} />,
    },
  ];

  return (
    <div className={styles.authMenuContent}>
      <h6 className={styles.heading}>Account Info</h6>

      {contentItems.map(({ label, icon }) => (
        <TopNavAuthMenuContentItem key={label} label={label} icon={icon} />
      ))}

      <div className={styles.buttonContainer}>
        <FlipButton onClick={onSignOut} scale={0.8} backgroundColor1="transparent">
          Sign Out
        </FlipButton>
      </div>
    </div>
  );
};

export default TopNavAuthMenuContent;

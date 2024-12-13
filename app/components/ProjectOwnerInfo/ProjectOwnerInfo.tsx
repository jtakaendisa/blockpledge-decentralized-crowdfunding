import Identicon from 'react-hooks-identicons';

import { truncateAccount } from '@/app/utils';

import styles from './ProjectOwnerInfo.module.scss';

interface Props {
  owner: string;
  iconSize?: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

const ProjectOwnerInfo = ({
  owner,
  iconSize = 15,
  fontSize,
  fontWeight,
  color,
}: Props) => {
  return (
    <div className={styles.ownerInfo}>
      <Identicon string={owner} size={iconSize} />
      <span style={{ fontSize, fontWeight, color }} className={styles.walletAddress}>
        {truncateAccount(owner, 4, 4)}
      </span>
    </div>
  );
};

export default ProjectOwnerInfo;

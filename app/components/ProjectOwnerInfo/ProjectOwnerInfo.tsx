import Identicon from 'react-hooks-identicons';

import { truncateAccount } from '@/app/utils';

import styles from './ProjectOwnerInfo.module.scss';

interface Props {
  owner: string;
}

const ProjectOwnerInfo = ({ owner }: Props) => {
  return (
    <div className={styles.ownerInfo}>
      <Identicon string={owner} size={15} />
      <span>{truncateAccount(owner, 4, 4)}</span>
    </div>
  );
};

export default ProjectOwnerInfo;

import { findDaysRemaining } from '@/app/utils';

import styles from './ProjectRemainingTime.module.scss';

interface Props {
  children: number;
  color?: string;
  fontWeight?: string;
}

const ProjectRemainingTime = ({ children, color, fontWeight }: Props) => {
  return (
    <span style={{ color, fontWeight }} className={styles.remainingTime}>
      {findDaysRemaining(children)}
    </span>
  );
};

export default ProjectRemainingTime;

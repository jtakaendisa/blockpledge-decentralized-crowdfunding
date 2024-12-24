import { findRemainingTime } from '@/app/utils';

import styles from './ProjectRemainingTime.module.scss';

interface Props {
  children: number;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

const ProjectRemainingTime = ({ children, fontSize, fontWeight, color }: Props) => {
  return (
    <span style={{ fontSize, fontWeight, color }} className={styles.remainingTime}>
      {findRemainingTime(children)}
    </span>
  );
};

export default ProjectRemainingTime;

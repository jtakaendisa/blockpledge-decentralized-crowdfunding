import { ReactNode } from 'react';

import styles from './ProjectRemainingTime.module.scss';

interface Props {
  children: ReactNode;
}

const ProjectRemainingTime = ({ children }: Props) => {
  return <span className={styles.remainingTime}>{children}</span>;
};

export default ProjectRemainingTime;

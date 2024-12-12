import { ReactNode } from 'react';

import styles from './ProjectBadge.module.scss';

interface Props {
  children: ReactNode;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const ProjectBadge = ({ children, top, right, bottom, left }: Props) => {
  return (
    <div style={{ top, right, bottom, left }} className={styles.badge}>
      {children}
    </div>
  );
};

export default ProjectBadge;

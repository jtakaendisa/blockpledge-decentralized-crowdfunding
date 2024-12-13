import { ReactNode } from 'react';

import styles from './ProjectTitle.module.scss';

interface Props {
  children: ReactNode;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

const ProjectTitle = ({ children, fontSize, fontWeight, color }: Props) => {
  return (
    <h5 style={{ fontSize, fontWeight, color }} className={styles.title}>
      {children}
    </h5>
  );
};

export default ProjectTitle;

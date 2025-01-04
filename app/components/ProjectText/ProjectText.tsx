import { ReactNode } from 'react';

import styles from './ProjectText.module.scss';

interface Props {
  children: ReactNode;
  icon?: ReactNode;
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

const ProjectText = ({ children, icon, fontSize, fontWeight, color }: Props) => {
  return (
    <div className={styles.textContainer}>
      {icon}
      <p style={{ fontSize, fontWeight, color }} className={styles.text}>
        {children}
      </p>
    </div>
  );
};

export default ProjectText;

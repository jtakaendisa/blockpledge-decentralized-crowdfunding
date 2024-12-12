import { ReactNode } from 'react';

import styles from './ProjectTitle.module.scss';

interface Props {
  children: ReactNode;
}

const ProjectTitle = ({ children }: Props) => {
  return <h5 className={styles.title}>{children}</h5>;
};

export default ProjectTitle;

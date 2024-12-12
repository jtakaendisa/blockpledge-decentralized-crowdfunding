import { ReactNode } from 'react';

import styles from './SpaceBetweenRow.module.scss';

interface Props {
  children: ReactNode;
}

const SpaceBetweenRow = ({ children }: Props) => {
  return <div className={styles.spaceBetween}>{children}</div>;
};

export default SpaceBetweenRow;

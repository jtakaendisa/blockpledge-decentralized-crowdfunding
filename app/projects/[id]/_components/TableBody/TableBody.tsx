import { ReactNode } from 'react';

import styles from './TableBody.module.scss';

interface Props {
  children: ReactNode;
}

const TableBody = ({ children }: Props) => {
  return <tbody className={styles.tableBody}>{children}</tbody>;
};

export default TableBody;

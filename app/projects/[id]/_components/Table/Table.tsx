import { ReactNode } from 'react';

import styles from './Table.module.scss';

interface Props {
  children: ReactNode;
}

const Table = ({ children }: Props) => {
  return <table className={styles.table}>{children}</table>;
};

export default Table;

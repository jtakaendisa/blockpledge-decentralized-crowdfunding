import { ReactNode } from 'react';

import styles from './TableHeader.module.scss';

interface Props {
  children: ReactNode;
}

const TableHeader = ({ children }: Props) => {
  return <thead className={styles.tableHeader}>{children}</thead>;
};

export default TableHeader;

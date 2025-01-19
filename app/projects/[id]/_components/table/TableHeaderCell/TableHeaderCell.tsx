import { ReactNode } from 'react';

import styles from './TableHeaderCell.module.scss';

interface Props {
  children: ReactNode;
  width?: number | string;
}

const TableHeaderCell = ({ children, width }: Props) => {
  return (
    <th className={styles.tableHeaderCell} style={{ width }}>
      {children}
    </th>
  );
};

export default TableHeaderCell;

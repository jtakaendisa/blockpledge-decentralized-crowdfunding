import { ReactNode } from 'react';

import styles from './TableDataCell.module.scss';

interface Props {
  children: ReactNode;
  width?: number | string;
}

const TableDataCell = ({ children, width }: Props) => {
  return (
    <td className={styles.tableDataCell} style={{ width }}>
      {children}
    </td>
  );
};

export default TableDataCell;

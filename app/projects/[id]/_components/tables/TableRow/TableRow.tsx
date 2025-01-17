import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const TableRow = ({ children }: Props) => {
  return <tr>{children}</tr>;
};

export default TableRow;

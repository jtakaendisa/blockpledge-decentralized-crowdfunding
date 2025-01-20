import Identicon from 'react-hooks-identicons';

import { truncateText } from '@/app/utils';
import { useProjectPageContext } from '@/app/hooks/useProjectPageContext';
import Table from '../table/Table/Table';
import TableRow from '../table/TableRow/TableRow';
import TableHeader from '../table/TableHeader/TableHeader';
import TableHeaderCell from '../table/TableHeaderCell/TableHeaderCell';
import TableBody from '../table/TableBody/TableBody';
import TableDataCell from '../table/TableDataCell/TableDataCell';
import RefundedIcon from '@/app/components/icons/RefundedIcon';

import styles from './DonationLedgerTable.module.scss';

const headerTitles = [
  {
    title: 'Backers',
    width: 160,
  },
  {
    title: 'Contributions (ETH)',
    width: 203,
  },
  {
    title: 'Time',
    width: 167,
  },
  {
    title: 'Comments',
    width: 'auto',
  },
  {
    title: 'Refunded',
    width: 93,
  },
];

const DonationLedgerTable = () => {
  const { project, backers } = useProjectPageContext();

  const isTerminated = [2, 3].includes(project.status);

  const filteredHeaderTitles = isTerminated ? headerTitles : headerTitles.slice(0, -1); // Exclude the refunded column when the project is not terminated

  if (!backers.length) {
    return <span>No contributions have been received yet.</span>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {filteredHeaderTitles.map(({ title, width }) => (
            <TableHeaderCell key={title} width={width}>
              {title}
            </TableHeaderCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {backers.map(
          ({ backer, contribution, timestamp, comment, refunded }, index) => (
            <TableRow key={index}>
              <TableDataCell>
                <div className={styles.backerInfo}>
                  <Identicon string={backer} size={25} />
                  <span>{backer}</span>
                </div>
              </TableDataCell>
              <TableDataCell>{contribution}</TableDataCell>
              <TableDataCell>{timestamp}</TableDataCell>
              <TableDataCell>{truncateText(comment, 130, true) || '---'}</TableDataCell>
              {isTerminated && (
                <TableDataCell>
                  <div className={styles.refundStatus}>
                    <RefundedIcon refunded={refunded} />
                  </div>
                </TableDataCell>
              )}
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
};

export default DonationLedgerTable;

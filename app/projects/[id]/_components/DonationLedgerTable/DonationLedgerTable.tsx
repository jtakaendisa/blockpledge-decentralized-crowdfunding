import Identicon from 'react-hooks-identicons';

import { useProjectPageState } from '@/app/contexts/ProjectPageContext';
import { truncateText } from '@/app/utils';
import Table from '../Table/Table';
import TableRow from '../TableRow/TableRow';
import TableHeader from '../TableHeader/TableHeader';
import TableHeaderCell from '../TableHeaderCell/TableHeaderCell';
import TableBody from '../TableBody/TableBody';
import TableDataCell from '../TableDataCell/TableDataCell';
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
  const { backers, project } = useProjectPageState(['backers', 'project']);

  const { status } = project.get;
  const isTerminated = status === 2 || status === 3;

  const filteredHeaderTitles = isTerminated ? headerTitles : headerTitles.slice(0, -1); // Exclude the last element when not terminated

  if (!backers.get.length) {
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
        {backers.get.map(
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

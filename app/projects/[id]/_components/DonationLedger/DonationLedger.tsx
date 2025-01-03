import { useProjectPageState } from '@/app/contexts/ProjectPageContext';
import SectionHeading from '@/app/components/SectionHeading/SectionHeading';
import DonationLedgerTable from '../DonationLedgerTable/DonationLedgerTable';

import styles from './DonationLedger.module.scss';

const DonationLedger = () => {
  const { backers } = useProjectPageState(['backers']);

  return (
    <section className={styles.donationLedger}>
      <SectionHeading>Donation Ledger.</SectionHeading>

      {backers.get && !backers.get.length ? (
        <span>No donations have been received yet.</span>
      ) : (
        <DonationLedgerTable />
      )}
    </section>
  );
};

export default DonationLedger;

import SectionHeading from '@/app/components/SectionHeading/SectionHeading';
import DonationLedgerTable from '../DonationLedgerTable/DonationLedgerTable';

import styles from './DonationLedger.module.scss';

const DonationLedger = () => {
  return (
    <section className={styles.donationLedger}>
      <SectionHeading>Donation Ledger.</SectionHeading>
      <DonationLedgerTable />
    </section>
  );
};

export default DonationLedger;

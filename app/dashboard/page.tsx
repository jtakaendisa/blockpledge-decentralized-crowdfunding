import Header from '../components/Header/Header';
import Projects from '../components/Projects/Projects';
import styles from './page.module.scss';

const AdminDashboardPage = () => {
  return (
    <div className={styles.dashboardPage}>
      <Header />
      <section>
        <h2>Projects Pending Approval</h2>
        <Projects pendingApproval />
      </section>
    </div>
  );
};

export default AdminDashboardPage;

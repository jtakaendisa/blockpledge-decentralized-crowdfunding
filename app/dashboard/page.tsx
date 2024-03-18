import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';
import styles from './page.module.scss';

const AdminDashboardPage = () => {
  return (
    <div className={styles.dashboardPage}>
      <Header />
      <section>
        <h2>Projects Pending Approval</h2>
        <ProjectsGrid pendingApproval />
      </section>
    </div>
  );
};

export default AdminDashboardPage;

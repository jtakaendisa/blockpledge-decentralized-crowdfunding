'use client';

import { useAdminDashboard } from './hooks/useAdminDashboard';
import DashboardProjectsSection from '../components/DashboardProjectsSection/DashboardProjectsSection';
import DashboardProjectsSectionSkeleton from '../components/DashboardProjectsSectionSkeleton/DashboardProjectsSectionSkeleton';

import styles from './page.module.scss';

const AdminDashboardPage = () => {
  const { isAdmin, projects, sections } = useAdminDashboard();

  if (!isAdmin) {
    return <div>Redirecting to sign in page...</div>;
  }

  return (
    <div className={styles.dashboardPage}>
      {!projects.length ? (
        <DashboardProjectsSectionSkeleton />
      ) : (
        sections.map(
          ({ title, projects }) =>
            !!projects.length && (
              <DashboardProjectsSection
                key={title}
                sectionTitle={`${title} (${projects.length})`}
                projects={projects}
              />
            )
        )
      )}
    </div>
  );
};

export default AdminDashboardPage;

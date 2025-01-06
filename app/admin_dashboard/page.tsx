'use client';

import { useProjectStore } from '../store';
import useAdminDashboard from './hooks/useAdminDashboard';
import DashboardProjectsSection from '../components/DashboardProjectsSection/DashboardProjectsSection';

import styles from './page.module.scss';

const AdminDashboardPage = () => {
  const projects = useProjectStore((s) => s.projects);

  const { sections } = useAdminDashboard(projects);

  return (
    <div className={styles.dashboardPage}>
      {sections.map(
        ({ title, projects }) =>
          projects.length > 0 && (
            <DashboardProjectsSection
              key={title}
              sectionTitle={`${title} (${projects.length})`}
              projects={projects}
            />
          )
      )}
    </div>
  );
};

export default AdminDashboardPage;

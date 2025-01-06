'use client';

import { useAccountStore, useProjectStore } from '../store';
import { useUserDashboard } from './hooks/useUserDashboard';
import DashboardProjectsSection from '../components/DashboardProjectsSection/DashboardProjectsSection';
import ErrorFallback from '../components/ErrorFallback/ErrorFallback';

import styles from './page.module.scss';

const UserDashboardPage = () => {
  const projects = useProjectStore((s) => s.projects);
  const authUser = useAccountStore((s) => s.authUser);

  const { sections, isLoading, error } = useUserDashboard(projects, authUser);

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return (
    <div className={styles.dashboardPage}>
      {isLoading ? (
        <span>Loading...</span>
      ) : (
        sections.map(
          ({ title, projects }) =>
            projects.length > 0 && (
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

export default UserDashboardPage;

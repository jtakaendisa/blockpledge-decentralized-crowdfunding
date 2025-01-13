'use client';

import { useAccountStore, useProjectStore } from '../store';
import { useUserDashboard } from './hooks/useUserDashboard';
import DashboardProjectsSection from '../components/DashboardProjectsSection/DashboardProjectsSection';
import DashboardProjectsSectionSkeleton from '../components/DashboardProjectsSectionSkeleton/DashboardProjectsSectionSkeleton';

import styles from './page.module.scss';

const UserDashboardPage = () => {
  const projects = useProjectStore((s) => s.projects);
  const authUser = useAccountStore((s) => s.authUser);

  const { sections } = useUserDashboard(projects, authUser);

  if (!authUser) {
    return <div>Redirecting to sign in page...</div>;
  }

  return (
    <div className={styles.dashboardPage}>
      {!projects.length ? (
        <DashboardProjectsSectionSkeleton />
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

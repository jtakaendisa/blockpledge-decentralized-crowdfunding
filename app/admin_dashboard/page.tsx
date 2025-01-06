'use client';

import { useMemo } from 'react';

import { useProjectStore } from '../store';
import DashboardProjectsSection from '../components/DashboardProjectsSection/DashboardProjectsSection';

import styles from './page.module.scss';

const AdminDashboardPage = () => {
  const projects = useProjectStore((s) => s.projects);

  const projectsPendingApproval = useMemo(
    () => projects.filter((project) => project.status === 5),
    [projects]
  );
  const projectsPaidOut = useMemo(
    () => projects.filter((project) => project.status === 4),
    [projects]
  );
  const projectsTerminated = useMemo(
    () => projects.filter((project) => project.status === 2 || project.status === 3),
    [projects]
  );

  return (
    <div className={styles.dashboardPage}>
      {!!projectsPendingApproval.length && (
        <DashboardProjectsSection
          sectionTitle="Projects Pending Approval."
          projects={projectsPendingApproval}
        />
      )}

      {!!projectsPaidOut.length && (
        <DashboardProjectsSection
          sectionTitle="Projects Paid Out."
          projects={projectsPaidOut}
        />
      )}

      {!!projectsTerminated.length && (
        <DashboardProjectsSection
          sectionTitle="Projects Terminated."
          projects={projectsTerminated}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;

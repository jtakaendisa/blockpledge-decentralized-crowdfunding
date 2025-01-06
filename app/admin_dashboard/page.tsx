'use client';

import { useMemo } from 'react';

import { useProjectStore } from '../store';
import DashboardProjectsSection from '../components/DashboardProjectsSection/DashboardProjectsSection';

import styles from './page.module.scss';

const AdminDashboardPage = () => {
  const projects = useProjectStore((s) => s.projects);

  const categorizedProjects = useMemo(
    () => ({
      pendingApproval: projects.filter((project) => project.status === 5),
      paidOut: projects.filter((project) => project.status === 4),
      terminated: projects.filter((project) => [2, 3].includes(project.status)),
    }),
    [projects]
  );

  const sections = [
    {
      title: 'Projects Pending Approval.',
      projects: categorizedProjects.pendingApproval,
    },
    {
      title: 'Projects Paid Out.',
      projects: categorizedProjects.paidOut,
    },
    {
      title: 'Projects Terminated.',
      projects: categorizedProjects.terminated,
    },
  ];

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

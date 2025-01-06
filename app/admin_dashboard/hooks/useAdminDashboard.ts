import { useMemo } from 'react';

import { Project } from '@/app/entities';

const useAdminDashboard = (projects: Project[]) => {
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

  return { sections };
};

export default useAdminDashboard;

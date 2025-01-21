import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useGlobalStateContext } from '@/app/hooks/useGlobalStateContext';

export const useAdminDashboard = () => {
  const router = useRouter();
  const { projects, authUser } = useGlobalStateContext();

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

  const isAdmin = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_UID;

  useEffect(() => {
    if (!isAdmin) {
      router.replace('/auth');
    }
  }, [authUser, isAdmin, router]);

  return { isAdmin, projects, sections };
};

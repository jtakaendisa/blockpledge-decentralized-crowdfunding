import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import { useGlobalStateContext } from '@/app/hooks/useGlobalStateContext';

export const useUserDashboard = () => {
  const router = useRouter();
  const { projects, authUser } = useGlobalStateContext();

  const categorizedProjects = useMemo(
    () => ({
      userProjects: projects.filter(
        (project) => authUser?.wallet.toLowerCase() === project.owner.toLowerCase()
      ),
      following: projects.filter((project) => authUser?.following.includes(project.id)),
      backed: projects.filter((project) => authUser?.backed.includes(project.id)),
    }),
    [projects, authUser]
  );

  const sections = [
    {
      title: 'My Projects',
      projects: categorizedProjects.userProjects,
    },
    {
      title: "Projects I'm Following.",
      projects: categorizedProjects.following,
    },
    {
      title: "Projects I've Backed.",
      projects: categorizedProjects.backed,
    },
  ];

  useEffect(() => {
    if (!authUser) {
      router.replace('/auth');
    }
  }, [authUser, router]);

  return { projects, sections, authUser };
};

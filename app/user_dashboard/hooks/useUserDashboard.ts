import { useMemo } from 'react';

import { AuthUser, Project } from '@/app/entities';

export const useUserDashboard = (projects: Project[], authUser: AuthUser | null) => {
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

  return { sections };
};

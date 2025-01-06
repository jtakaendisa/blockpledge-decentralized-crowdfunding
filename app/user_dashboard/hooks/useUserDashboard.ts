import { useEffect, useMemo, useState } from 'react';

import { AuthUser, Project } from '@/app/entities';
import { useBlockchain } from '@/app/hooks/useBlockchain';

export const useUserDashboard = (projects: Project[], authUser: AuthUser | null) => {
  const { getUserProjects } = useBlockchain();

  const [isLoading, setIsLoading] = useState(false);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const categorizedProjects = useMemo(
    () => ({
      following: projects.filter((project) => authUser?.following.includes(project.id)),
      backed: projects.filter((project) => authUser?.backed.includes(project.id)),
    }),
    [projects, authUser]
  );

  const sections = [
    {
      title: 'My Projects',
      projects: userProjects,
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
    const fetchData = async () => {
      if (authUser?.accountType !== 'owner') return;

      try {
        setIsLoading(true);
        const { userProjects } = await getUserProjects(authUser.wallet);
        setUserProjects(userProjects);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [authUser, projects, getUserProjects]);

  return { sections, isLoading, error };
};

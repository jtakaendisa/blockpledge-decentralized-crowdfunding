'use client';

import { useEffect, useState } from 'react';

import { Project, useAccountStore } from '../store';
import useBlockchain from '../hooks/useBlockchain';
import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';

import styles from './page.module.scss';

const UserDashBoardPage = () => {
  const authUser = useAccountStore((s) => s.authUser);
  const { getProjects, getUserProjects } = useBlockchain();
  const [projectsFollowed, setProjectsFollowed] = useState<Project[]>([]);
  const [projectsBacked, setProjectsBacked] = useState<Project[]>([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authUser) return;

        const { projects } = await getProjects();

        const projectsBeingFollowed = projects.filter((project) =>
          authUser.following.includes(project.id)
        );

        const projectsBeingBacked = projects.filter((project) =>
          authUser.backed.includes(project.id)
        );

        setProjectsFollowed(projectsBeingFollowed);
        setProjectsBacked(projectsBeingBacked);

        if (authUser.accountType === 'owner') {
          const { userProjects } = await getUserProjects(authUser.wallet);
          setUserProjects(userProjects);
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    fetchData();
  }, [authUser, getProjects, getUserProjects]);

  if (!authUser) return null;

  return (
    <div className={styles.dashboardPage}>
      <Header />
      {authUser?.accountType === 'owner' && (
        <section>
          <h2>You&apos;re Projects</h2>
          {!userProjects.length && <p>No projects yet.</p>}
          <ProjectsGrid projects={userProjects} />
        </section>
      )}
      {projectsFollowed.length > 0 && (
        <section>
          <h2>Projects You&apos;re Following</h2>
          <ProjectsGrid projects={projectsFollowed} />
        </section>
      )}
      {projectsBacked.length > 0 && (
        <section>
          <h2>Projects You&apos;ve Backed</h2>
          <ProjectsGrid projects={projectsBacked} />
        </section>
      )}
    </div>
  );
};

export default UserDashBoardPage;

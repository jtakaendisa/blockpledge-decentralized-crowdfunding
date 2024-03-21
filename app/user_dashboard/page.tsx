'use client';

import { useCallback, useEffect, useState } from 'react';

import { Project, useAccountStore, useProjectStore } from '../store';
import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';

import styles from './page.module.scss';
import useBlockchain from '../hooks/useBlockchain';

const UserDashBoardPage = () => {
  const projects = useProjectStore((s) => s.projects);
  const authUser = useAccountStore((s) => s.authUser);
  const { getUserProjects } = useBlockchain();
  const [projectsFollowed, setProjectsFollowed] = useState<Project[]>([]);
  const [projectsBacked, setProjectsBacked] = useState<Project[]>([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (!authUser) return;

    const projectsBeingFollowed = projects.filter((project) =>
      authUser.following.includes(project.id)
    );

    setProjectsFollowed(projectsBeingFollowed);
  }, [projects, authUser]);

  useEffect(() => {
    if (!authUser) return;

    const projectsBeingBacked = projects.filter((project) =>
      authUser.backed.includes(project.id)
    );

    setProjectsBacked(projectsBeingBacked);
  }, [projects, authUser]);

  const fetchData = useCallback(async () => {
    if (!authUser) return;

    const { userProjects } = await getUserProjects(authUser.wallet);

    if (userProjects.length) {
      setUserProjects(userProjects);
    }
  }, [authUser, getUserProjects]);

  useEffect(() => {
    if (authUser && authUser.accountType === 'owner') {
      fetchData();
    }
  }, [authUser, fetchData]);

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

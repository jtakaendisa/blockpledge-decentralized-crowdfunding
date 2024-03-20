'use client';

import { useEffect, useState } from 'react';

import { Project, useAccountStore, useProjectStore } from '../store';
import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';

import styles from './page.module.scss';

const UserDashBoardPage = () => {
  const projects = useProjectStore((s) => s.projects);
  const authUser = useAccountStore((s) => s.authUser);
  const [projectsFollowed, setProjectsFollowed] = useState<Project[]>([]);
  const [projectsBacked, setProjectsBacked] = useState<Project[]>([]);

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

  return (
    <div className={styles.dashboardPage}>
      <Header />
      <section>
        <h2>Projects You&apos;re Following</h2>
        <ProjectsGrid projects={projectsFollowed} />
      </section>
      <section>
        <h2>Projects You&apos;ve Backed</h2>
        <ProjectsGrid projects={projectsBacked} />
      </section>
    </div>
  );
};

export default UserDashBoardPage;

'use client';

import { useEffect, useState } from 'react';

import { Project, useAccountStore, useProjectStore } from '../store';
import useBlockchain from '../hooks/useBlockchain';
import Header from '../components/TopNav/TopNav';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';

import styles from './page.module.scss';

const UserDashBoardPage = () => {
  const authUser = useAccountStore((s) => s.authUser);
  const projects = useProjectStore((s) => s.projects);
  const { getUserProjects } = useBlockchain();
  const [projectsFollowed, setProjectsFollowed] = useState<Project[]>([]);
  const [projectsBacked, setProjectsBacked] = useState<Project[]>([]);
  const [userProjects, setUserProjects] = useState<Project[]>([]);
  const [loadingUserProjects, setLoadingUserProjects] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsBeingFollowed = projects.filter((project) =>
          authUser?.following.includes(project.id)
        );

        const projectsBeingBacked = projects.filter((project) =>
          authUser?.backed.includes(project.id)
        );

        setProjectsFollowed(projectsBeingFollowed);
        setProjectsBacked(projectsBeingBacked);

        if (authUser?.accountType === 'owner') {
          setLoadingUserProjects(true);
          const { userProjects } = await getUserProjects(authUser.wallet);
          setUserProjects(userProjects);
          setLoadingUserProjects(false);
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    fetchData();
  }, [authUser, projects, getUserProjects]);

  return (
    <div className={styles.dashboardPage}>
      <Header />
      {authUser?.accountType === 'owner' && (
        <section>
          <h2>You&apos;re Projects</h2>
          {loadingUserProjects ? (
            <ProjectsGrid projects={[]} />
          ) : (
            <>
              {!userProjects.length && <p>No projects yet.</p>}
              <ProjectsGrid projects={userProjects} />
            </>
          )}
        </section>
      )}
      <section>
        <h2>Projects You&apos;re Following</h2>
        {!projects.length && <ProjectsGrid projects={[]} />}
        {!projectsFollowed.length ? (
          <p>No projects yet.</p>
        ) : (
          <ProjectsGrid projects={projectsFollowed} />
        )}
      </section>
      <section>
        <h2>Projects You&apos;ve Backed</h2>
        {!projects.length && <ProjectsGrid projects={[]} />}
        {!projectsBacked.length ? (
          <p>No projects yet.</p>
        ) : (
          <ProjectsGrid projects={projectsBacked} />
        )}
      </section>
    </div>
  );
};

export default UserDashBoardPage;

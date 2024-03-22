'use client';

import { useEffect, useState } from 'react';

import { Project } from '../store';
import useBlockchain from '../hooks/useBlockchain';
import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';

import styles from './page.module.scss';

const AdminDashboardPage = () => {
  const { getProjects } = useBlockchain();
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { projects } = await getProjects();

        setFilteredProjects(projects?.filter((project) => project.status === 5));
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    fetchData();
  }, [getProjects]);

  if (!filteredProjects) return null;

  return (
    <div className={styles.dashboardPage}>
      <Header />
      <section>
        <h2>Projects Pending Approval</h2>
        <ProjectsGrid projects={filteredProjects} />
      </section>
    </div>
  );
};

export default AdminDashboardPage;

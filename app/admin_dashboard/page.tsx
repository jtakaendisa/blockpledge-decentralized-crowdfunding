'use client';

import { useEffect, useState } from 'react';

import { Project, useProjectStore } from '../store';
import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';

import styles from './page.module.scss';

const AdminDashboardPage = () => {
  const projects = useProjectStore((s) => s.projects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!projects) return;

        setFilteredProjects(projects.filter((project) => project.status === 5));
      } catch (error) {
        console.log((error as Error).message);
      }
    };

    fetchData();
  }, [projects]);

  if (!filteredProjects) return null;

  return (
    <div className={styles.dashboardPage}>
      <Header />
      <section className={styles.projectsSection}>
        <h2>Projects Pending Approval</h2>
        {!filteredProjects.length && <p>No projects to approve.</p>}
        <ProjectsGrid projects={filteredProjects} />
      </section>
    </div>
  );
};

export default AdminDashboardPage;

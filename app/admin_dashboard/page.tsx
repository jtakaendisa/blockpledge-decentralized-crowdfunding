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
    setFilteredProjects(projects.filter((project) => project.status === 5));
  }, [projects]);

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

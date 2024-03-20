'use client';

import { useEffect, useState } from 'react';

import { Project, useAccountStore, useProjectStore } from '@/app/store';
import Button from '../Button/Button';
import ProjectCard from '../ProjectCard/ProjectCard';

import styles from './ProjectsGrid.module.scss';

interface Props {
  projects: Project[];
  pendingApproval?: boolean;
  following?: boolean;
  backed?: boolean;
}

export const statusColorMap = {
  0: 'gray',
  1: 'green',
  2: 'gray',
  3: 'red',
  4: 'orange',
  5: 'orange',
};

const ProjectsGrid = ({ projects, pendingApproval, following, backed }: Props) => {
  const end = useProjectStore((s) => s.end);
  const selectedCategory = useProjectStore((s) => s.selectedCategory);
  const searchText = useProjectStore((s) => s.searchText);
  const setEnd = useProjectStore((s) => s.setEnd);
  const authUser = useAccountStore((s) => s.authUser);
  const count = 12;

  // useEffect(() => {
  //   if (selectedCategory) {
  //     setDisplayedProjects(
  //       allProjects
  //         .filter((project) => project.categoryId === selectedCategory.id)
  //         .slice(0, end)
  //     );
  //   }
  // }, [allProjects, selectedCategory, end]);

  // useEffect(() => {
  //   if (searchText.length) {
  //     setDisplayedProjects(
  //       allProjects.filter((project) =>
  //         project.title.toLowerCase().includes(searchText)
  //       )
  //     );
  //   } else {
  //     setDisplayedProjects(allProjects.slice(0, end));
  //   }
  // }, [allProjects, searchText, end]);

  // useEffect(() => {
  //   if (!selectedCategory && !searchText.length) {
  //     setDisplayedProjects(allProjects.slice(0, end));
  //   }
  // }, [allProjects, selectedCategory, searchText, end]);

  // useEffect(() => {
  //   if (following && authUser) {
  //     const projectsBeingFollowed = [];

  //     for (let i = 0; i < authUser.following.length; i++) {
  //       const followedProject = allProjects.find(
  //         (project) => project.id === authUser.following[i]
  //       );

  //       if (followedProject) {
  //         projectsBeingFollowed.push(followedProject);
  //       }
  //     }

  //     setDisplayedProjects(projectsBeingFollowed);
  //   }
  // }, [allProjects, following, authUser]);

  // useEffect(() => {
  //   if (backed && authUser) {
  //     const projectsBeingBacked = [];

  //     for (let i = 0; i < authUser.backed.length; i++) {
  //       const backedProject = allProjects.find(
  //         (project) => project.id === authUser.backed[i]
  //       );

  //       if (backedProject) {
  //         projectsBeingBacked.push(backedProject);
  //       }
  //     }

  //     setDisplayedProjects(projectsBeingBacked);
  //   }
  // }, [allProjects, backed, authUser]);

  if (!projects) return null;

  return (
    <section className={styles.projects}>
      <div className={styles.cards}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {!pendingApproval && (
        <div className={styles.buttonContainer}>
          {end < projects.length && (
            <Button onClick={() => setEnd(count)}>Load More</Button>
          )}
        </div>
      )}
    </section>
  );
};

export default ProjectsGrid;

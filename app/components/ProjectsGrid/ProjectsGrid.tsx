'use client';

import { useEffect, useState } from 'react';

import { Project, useAccountStore, useProjectStore } from '@/app/store';
import Button from '../Button/Button';
import ProjectCard from '../ProjectCard/ProjectCard';

import styles from './ProjectsGrid.module.scss';

interface Props {
  projects: Project[];
}

export const statusColorMap = {
  0: 'gray',
  1: 'green',
  2: 'gray',
  3: 'red',
  4: 'orange',
  5: 'orange',
};

const ProjectsGrid = ({ projects }: Props) => {
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

  if (!projects) return null;

  return (
    <section className={styles.projects}>
      <div className={styles.cards}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        {end < projects.length && (
          <Button onClick={() => setEnd(count)}>Load More</Button>
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid;

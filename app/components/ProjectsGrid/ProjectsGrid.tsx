'use client';

import { useEffect, useState } from 'react';

import { Project, useProjectStore } from '@/app/store';
import Button from '../Button/Button';
import ProjectCard from '../ProjectCard/ProjectCard';

import styles from './ProjectsGrid.module.scss';

interface ProjectsProps {
  pendingApproval?: boolean;
}

export const statusColorMap = {
  0: 'gray',
  1: 'green',
  2: 'gray',
  3: 'red',
  4: 'orange',
  5: 'orange',
};

const ProjectsGrid = ({ pendingApproval }: ProjectsProps) => {
  const allProjects = useProjectStore((s) => s.projects);
  const end = useProjectStore((s) => s.end);
  const selectedCategory = useProjectStore((s) => s.selectedCategory);
  const searchText = useProjectStore((s) => s.searchText);
  const setEnd = useProjectStore((s) => s.setEnd);
  const [displayedProjects, setDisplayedProjects] = useState<Project[]>(allProjects);
  const count = 12;

  useEffect(() => {
    if (pendingApproval) {
      setDisplayedProjects(allProjects.filter((project) => project.status === 5));
    }
  }, [allProjects, pendingApproval]);

  useEffect(() => {
    if (selectedCategory) {
      setDisplayedProjects(
        allProjects
          .filter((project) => project.categoryId === selectedCategory.id)
          .slice(0, end)
      );
    }
  }, [allProjects, selectedCategory, end]);

  useEffect(() => {
    if (searchText.length) {
      setDisplayedProjects(
        allProjects.filter((project) =>
          project.title.toLowerCase().includes(searchText)
        )
      );
    } else {
      setDisplayedProjects(allProjects.slice(0, end));
    }
  }, [allProjects, searchText, end]);

  useEffect(() => {
    if (!selectedCategory && !searchText.length) {
      setDisplayedProjects(allProjects.slice(0, end));
    }
  }, [allProjects, selectedCategory, searchText, end]);

  if (!allProjects) return null;

  return (
    <section className={styles.projects}>
      <div className={styles.cards}>
        {displayedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {!pendingApproval && (
        <div className={styles.buttonContainer}>
          {end < allProjects.length && (
            <Button onClick={() => setEnd(count)}>Load More</Button>
          )}
        </div>
      )}
    </section>
  );
};

export default ProjectsGrid;

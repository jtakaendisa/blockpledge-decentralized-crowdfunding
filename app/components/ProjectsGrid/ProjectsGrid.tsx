'use client';

import { useEffect, useState } from 'react';

import { Category, Project, useProjectStore } from '@/app/store';
import Button from '../Button/Button';
import ProjectCard from '../ProjectCard/ProjectCard';

import styles from './ProjectsGrid.module.scss';

interface Props {
  projects: Project[];
  selectedCategory: Category | null;
}

export const statusColorMap = {
  0: 'gray',
  1: 'green',
  2: 'gray',
  3: 'red',
  4: 'orange',
  5: 'orange',
};

const COUNT = 12;

const ProjectsGrid = ({ projects, selectedCategory }: Props) => {
  const searchText = useProjectStore((s) => s.searchText);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [end, setEnd] = useState(12);

  useEffect(() => {
    if (projects.length) {
      setFilteredProjects(projects.slice(0, end));
    }
  }, [projects, end]);

  useEffect(() => {
    if (searchText.length && projects.length) {
      setFilteredProjects(
        projects.filter((project) => project.title.toLowerCase().includes(searchText))
      );
    }

    if (!searchText.length && projects.length) {
      setFilteredProjects(projects.slice(0, end));
    }
  }, [searchText, projects, end]);

  useEffect(() => {
    if (selectedCategory && projects.length) {
      setFilteredProjects(
        projects
          .filter((project) => project.categoryId === selectedCategory.id)
          .slice(0, end)
      );
    }

    if (!selectedCategory && projects.length) {
      setFilteredProjects(projects.slice(0, end));
    }
  }, [selectedCategory, projects, end]);

  if (!projects) return null;

  return (
    <section className={styles.projects}>
      <div className={styles.cards}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        {end < projects.length && (
          <Button onClick={() => setEnd((prev) => prev + COUNT)}>Load More</Button>
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid;

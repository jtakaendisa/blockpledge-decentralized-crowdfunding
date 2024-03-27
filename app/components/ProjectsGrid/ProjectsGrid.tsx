'use client';

import { useEffect, useState } from 'react';

import { Category, Project, useProjectStore } from '@/app/store';
import Button from '../Button/Button';
import ProjectCard from '../ProjectCard/ProjectCard';

import styles from './ProjectsGrid.module.scss';
import ProjectCardSkeleton from '../ProjectCardSkeleton/ProjectCardSkeleton';

interface Props {
  projects: Project[];
  selectedCategory?: Category | null;
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

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ProjectsGrid = ({ projects, selectedCategory }: Props) => {
  const searchText = useProjectStore((s) => s.searchText);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [end, setEnd] = useState(12);

  useEffect(() => {
    if (projects.length) {
      setFilteredProjects(projects);
    }
  }, [projects, end]);

  useEffect(() => {
    if (searchText.length && projects.length) {
      setFilteredProjects(
        projects.filter((project) => project.title.toLowerCase().includes(searchText))
      );
    }

    if (!searchText.length && projects.length) {
      setFilteredProjects(projects);
    }
  }, [searchText, projects, end]);

  useEffect(() => {
    if (selectedCategory && projects.length) {
      setFilteredProjects(
        projects.filter((project) => project.categoryId === selectedCategory.id)
      );
    }

    if (!selectedCategory && projects.length) {
      setFilteredProjects(projects);
    }
  }, [selectedCategory, projects, end]);

  useEffect(() => {
    setEnd(12);
  }, [selectedCategory]);

  return (
    <section className={styles.projects}>
      <div className={styles.cards}>
        {!projects.length
          ? skeletons.map((skeleton) => <ProjectCardSkeleton key={skeleton} />)
          : filteredProjects
              .map((project) => <ProjectCard key={project.id} project={project} />)
              .slice(0, end)}
      </div>
      <div className={styles.buttonContainer}>
        {end < filteredProjects.length && (
          <Button onClick={() => setEnd((prev) => prev + COUNT)}>Load More</Button>
        )}
      </div>
    </section>
  );
};

export default ProjectsGrid;

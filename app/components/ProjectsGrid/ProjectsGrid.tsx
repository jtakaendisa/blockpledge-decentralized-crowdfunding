'use client';

import { useEffect, useState } from 'react';

import { Project, useProjectStore } from '@/app/store';
import Button from '../Button/Button';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectCardSkeleton from '../ProjectCardSkeleton/ProjectCardSkeleton';

import styles from './ProjectsGrid.module.scss';

interface Props {
  projects: Project[];
  selectedCategoryId: number | null;
}

const COUNT = 12;

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const ProjectsGrid = ({ projects, selectedCategoryId }: Props) => {
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
    if (projects.length) {
      setFilteredProjects(
        projects.filter((project) => project.categoryId === selectedCategoryId)
      );
    }

    if (typeof selectedCategoryId !== 'number' && projects.length) {
      setFilteredProjects(projects);
    }
  }, [selectedCategoryId, projects, end]);

  useEffect(() => {
    setEnd(12);
  }, [selectedCategoryId]);

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

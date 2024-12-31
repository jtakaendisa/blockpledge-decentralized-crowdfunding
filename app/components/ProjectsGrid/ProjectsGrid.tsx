'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { useProjectStore } from '@/app/store';
import { useProjectsPageState } from '@/app/contexts/ProjectsPageContext';
import { generateIncrementingArray } from '@/app/utils';
import ProjectCard from '../ProjectCard/ProjectCard';
import Button from '../Button/Button';
import ProjectCardSkeleton from '../ProjectCardSkeleton/ProjectCardSkeleton';

import styles from './ProjectsGrid.module.scss';

interface Props {
  selectedCategoryId: number | null;
}

const COUNT = 10;

const revealVariants = {
  initial: {
    opacity: 0.5,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const skeletons = generateIncrementingArray(12);

const ProjectsGrid = ({ selectedCategoryId }: Props) => {
  const projects = useProjectStore((s) => s.projects);

  const { searchQuery } = useProjectsPageState(['searchQuery']);

  const containerRef = useRef<HTMLDivElement>(null);

  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [end, setEnd] = useState(COUNT);

  useEffect(() => {
    if (projects.length) {
      setFilteredProjects(projects);
    }
  }, [projects, end]);

  useEffect(() => {
    if (searchQuery.get.length && projects.length) {
      setFilteredProjects(
        projects.filter((project) =>
          project.title.toLowerCase().includes(searchQuery.get)
        )
      );
    }

    if (!searchQuery.get.length && projects.length) {
      setFilteredProjects(projects);
    }
  }, [searchQuery.get, projects, end]);

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
    const container = containerRef.current;

    const handleResize = () => {
      if (!container) return;

      const { width } = container.getBoundingClientRect();

      let cardsPerRow = 5;

      if (width >= 1335) {
        cardsPerRow = 5;
      }
      if (width < 1335) {
        cardsPerRow = 4;
      }
      if (width < 1052) {
        cardsPerRow = 3;
      }
      if (width < 786) {
        cardsPerRow = 2;
      }

      container.style.setProperty('--cards-per-row', cardsPerRow.toString());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  return (
    <motion.section
      key={selectedCategoryId + searchQuery.get}
      ref={containerRef}
      className={styles.projectsGrid}
      initial="initial"
      animate="animate"
      variants={revealVariants}
    >
      {!projects.length
        ? skeletons.map((skeleton) => <ProjectCardSkeleton key={skeleton} />)
        : filteredProjects
            .map((project) => <ProjectCard key={project.id} project={project} />)
            .slice(0, end)}

      {/* <div className={styles.buttonContainer}>
        {end < filteredProjects.length && (
          <Button onClick={() => setEnd((prev) => prev + COUNT)}>Load More</Button>
        )}
      </div> */}
    </motion.section>
  );
};

export default ProjectsGrid;

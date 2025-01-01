import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { useProjectStore } from '@/app/store';
import { useProjectsPageState } from '@/app/contexts/ProjectsPageContext';
import { debounce, generateIncrementingArray } from '@/app/utils';
import ProjectsGridNoResults from '../ProjectsGridNoResults/ProjectsGridNoResults';
import ProjectCard from '../../../components/ProjectCard/ProjectCard';
import FlipButton from '../../../components/FlipButton/FlipButton';
import ProjectCardSkeleton from '../../../components/ProjectCardSkeleton/ProjectCardSkeleton';

import styles from './ProjectsGrid.module.scss';

interface Props {
  selectedCategoryId: number | null;
}

const INITIAL_LIST_SIZE = 10;
const INCREMENT_SIZE = 5;

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

const skeletons = generateIncrementingArray(INITIAL_LIST_SIZE);

const ProjectsGrid = ({ selectedCategoryId }: Props) => {
  const projects = useProjectStore((s) => s.projects);
  const { searchQuery } = useProjectsPageState(['searchQuery']);
  const containerRef = useRef<HTMLDivElement>(null);

  const [listSize, setListSize] = useState(INITIAL_LIST_SIZE);

  const increaseListSize = () => setListSize((prev) => prev + INCREMENT_SIZE);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategoryId == null || project.categoryId === selectedCategoryId;

      const matchesSearchQuery = project.title
        .toLowerCase()
        .includes(searchQuery.get.toLowerCase());

      return matchesCategory && matchesSearchQuery;
    });
  }, [projects, searchQuery.get, selectedCategoryId]);

  useEffect(() => {
    const container = containerRef.current;

    const handleResize = debounce(() => {
      if (!container) return;

      const { width } = container.getBoundingClientRect();
      const cardsPerRow = width >= 1335 ? 5 : width >= 1052 ? 4 : width >= 786 ? 3 : 2;

      container.style.setProperty('--cards-per-row', cardsPerRow.toString());
    }, 350);

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);

  useEffect(() => {
    setListSize(INITIAL_LIST_SIZE);
  }, [selectedCategoryId, searchQuery.get]);

  const visibleProjects = filteredProjects.slice(0, listSize);

  if (!visibleProjects.length) {
    return <ProjectsGridNoResults />;
  }

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
        : visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}

      {listSize < filteredProjects.length && (
        <div className={styles.button}>
          <FlipButton onClick={increaseListSize}>Load More</FlipButton>
        </div>
      )}
    </motion.section>
  );
};

export default ProjectsGrid;

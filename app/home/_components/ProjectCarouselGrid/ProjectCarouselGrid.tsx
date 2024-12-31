import { useMemo } from 'react';
import { motion } from 'framer-motion';

import { Project } from '@/app/store';
import { useFeaturedProjectsState } from '@/app/contexts/FeaturedProjectsContext';
import ProjectCardWithHoverReveal from '@/app/components/ProjectCardWithHoverReveal/ProjectCardWithHoverReveal';

import styles from './ProjectCarouselGrid.module.scss';

interface Props {
  projects: Project[];
  selectedPage: number;
  chunkSize: number;
}

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

const ProjectCarouselGrid = ({ projects, selectedPage, chunkSize }: Props) => {
  const { blurDataURLs } = useFeaturedProjectsState(['blurDataURLs']);

  const filteredProjectsWithBlurData = useMemo(() => {
    const startIndex = (selectedPage - 1) * chunkSize;
    const endIndex = startIndex + chunkSize;

    // Filter projects and map each one with its corresponding blurDataURL
    return projects.slice(startIndex, endIndex).map((project, index) => ({
      ...project,
      blurDataURL: blurDataURLs.get[startIndex + index + 1] || '',
    }));
  }, [projects, selectedPage, chunkSize, blurDataURLs]);

  return (
    <motion.div
      key={selectedPage}
      className={styles.grid}
      initial="initial"
      animate="animate"
      variants={revealVariants}
    >
      {filteredProjectsWithBlurData.map((project) => (
        <ProjectCardWithHoverReveal key={project.id} project={project} />
      ))}
    </motion.div>
  );
};

export default ProjectCarouselGrid;

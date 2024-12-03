import { motion } from 'framer-motion';
import Carousel from 'react-multi-carousel';

import { Project } from '@/app/store';
import useHeadingReveal from '@/app/hooks/useHeadingReveal';
import StaggeredText from '../StaggeredText/StaggeredText';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectCardSkeleton from '../ProjectCardSkeleton/ProjectCardSkeleton';

import styles from './ProjectsRow.module.scss';
import 'react-multi-carousel/lib/styles.css';

interface Props {
  projects: Project[];
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  largeDesktop: {
    breakpoint: { max: 3000, min: 1920 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 1919, min: 1280 },
    items: 4,
  },
  smallDesktop: {
    breakpoint: { max: 1279, min: 980 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 979, min: 660 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 659, min: 0 },
    items: 1,
  },
};

const skeletons = [1, 2, 3, 4, 5, 6];

const ProjectsRow = ({ projects }: Props) => {
  const { playAnimation, handleViewportEnter } = useHeadingReveal();

  return (
    <section className={styles.projectsRow}>
      <motion.h2 onViewportEnter={handleViewportEnter} className={styles.heading}>
        <StaggeredText playAnimation={playAnimation} hidden>
          Featured Projects.
        </StaggeredText>
      </motion.h2>
      <div className={styles.carouselContainer}>
        {!projects.length ? (
          <Carousel responsive={responsive}>
            {skeletons.map((skeleton) => (
              <ProjectCardSkeleton key={skeleton} />
            ))}
          </Carousel>
        ) : (
          <Carousel responsive={responsive}>
            {projects.slice(0, 12).map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default ProjectsRow;

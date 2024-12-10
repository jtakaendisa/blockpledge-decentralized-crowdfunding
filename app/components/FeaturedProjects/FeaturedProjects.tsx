import { motion } from 'framer-motion';

import { useProjectStore } from '@/app/store';
import useHeadingReveal from '@/app/hooks/useHeadingReveal';
import StaggeredText from '../StaggeredText/StaggeredText';
import ProjectCard from '../ProjectCard/ProjectCard';

import styles from './FeaturedProjects.module.scss';

const FeaturedProjects = () => {
  const projects = useProjectStore((s) => s.projects);

  const { playAnimation, handleViewportEnter } = useHeadingReveal();

  return (
    <section className={styles.featuredProjects}>
      <motion.h2 onViewportEnter={handleViewportEnter} className={styles.heading}>
        <StaggeredText playAnimation={playAnimation} hidden>
          Featured Projects.
        </StaggeredText>
      </motion.h2>
      <div className={styles.showcaseContainer}>
        {!projects.length ? (
          <span>projects loading placeholder</span>
        ) : (
          <>
            <div className={styles.highlightedProject}>
              <ProjectCard project={projects[0]} />
            </div>
            <div className={styles.projectCarousel}></div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;

'use client';

import Carousel from 'react-multi-carousel';

import { useProjectStore } from '@/app/store';
import ProjectCard from '../ProjectCard/ProjectCard';

import styles from './ProjectsRow.module.scss';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProjectsRow = () => {
  const projects = useProjectStore((s) => s.projects);

  return (
    <section className={styles.projectsRow}>
      <h2>Featured Projects</h2>
      <div className={styles.carouselContainer}>
        <Carousel responsive={responsive}>
          {projects.slice(0, 18).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default ProjectsRow;

import { useProjectStore } from '@/app/store';
import SectionHeading from '../SectionHeading/SectionHeading';
import ProjectCard from '../ProjectCard/ProjectCard';
import ProjectCardWithHoverReveal from '../ProjectCardWithHoverReveal/ProjectCardWithHoverReveal';

import styles from './FeaturedProjects.module.scss';

const FeaturedProjects = () => {
  const projects = useProjectStore((s) => s.projects);

  return (
    <section className={styles.featuredProjects}>
      <SectionHeading>Featured Projects.</SectionHeading>
      <div className={styles.showcaseContainer}>
        {!projects.length ? (
          <span>projects loading placeholder</span>
        ) : (
          <>
            <div className={styles.highlightedProject}>
              <ProjectCard project={projects[0]} />
            </div>
            <div className={styles.projectCarousel}>
              <div className={styles.grid}>
                {projects.slice(1, 5).map((project) => (
                  <ProjectCardWithHoverReveal key={project.id} project={project} />
                ))}
              </div>
              <div className={styles.navigationButtons}>buttons</div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;

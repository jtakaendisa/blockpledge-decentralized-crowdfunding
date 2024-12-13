import { useProjectStore } from '@/app/store';
import SectionHeading from '../SectionHeading/SectionHeading';
import ProjectHighlight from '@/app/home/_components/ProjectHighlight/ProjectHighlight';
import ProjectCarousel from '@/app/home/_components/ProjectCarousel/ProjectCarousel';

import styles from './FeaturedProjects.module.scss';

const FeaturedProjects = () => {
  const projects = useProjectStore((s) => s.projects);

  return (
    <section className={styles.featuredProjects}>
      <SectionHeading>Featured Projects.</SectionHeading>
      <div className={styles.row}>
        {!projects.length ? (
          <span>projects loading placeholder</span>
        ) : (
          <>
            <ProjectHighlight project={projects[0]} />
            <ProjectCarousel projects={projects.slice(1)} />
          </>
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;

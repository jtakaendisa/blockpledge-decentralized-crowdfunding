import { useProjectStore } from '@/app/store';
import SectionHeading from '../SectionHeading/SectionHeading';
import ProjectHighlight from '@/app/home/_components/ProjectHighlight/ProjectHighlight';
import ProjectHighlightSkeleton from '../ProjectHighlightSkeleton/ProjectHighlightSkeleton';
import ProjectCarousel from '@/app/home/_components/ProjectCarousel/ProjectCarousel';
import ProjectCarouselSkeleton from '../ProjectCarouselSkeleton/ProjectCarouselSkeleton';

import styles from './FeaturedProjects.module.scss';

const FeaturedProjects = () => {
  const projects = useProjectStore((s) => s.projects);

  return (
    <section className={styles.featuredProjects}>
      <SectionHeading>Featured Projects.</SectionHeading>
      <div className={styles.row}>
        {!projects.length ? (
          <ProjectHighlightSkeleton />
        ) : (
          <ProjectHighlight project={projects[0]} />
        )}

        {!projects.length ? (
          <ProjectCarouselSkeleton />
        ) : (
          <ProjectCarousel projects={projects.slice(1)} />
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;

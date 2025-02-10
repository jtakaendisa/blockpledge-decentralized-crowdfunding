'use client';

import { useFeaturedProjectsContext } from '@/app/hooks/useFeaturedProjectsContext';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import ProjectsHighlight from '@/app/home/_components/ProjectsHighlight/ProjectsHighlight';
import ProjectsHighlightSkeleton from '@/app/home/_components/ProjectsHighlightSkeleton/ProjectsHighlightSkeleton';
import ProjectsCarousel from '@/app/home/_components/ProjectsCarousel/ProjectsCarousel';
import ProjectsCarouselSkeleton from '@/app/home/_components/ProjectsCarouselSkeleton/ProjectsCarouselSkeleton';

import styles from './FeaturedProjects.module.scss';

const FeaturedProjects = () => {
  const { isLoading, projects, blurDataUrls, totalPages, chunkSize } =
    useFeaturedProjectsContext();

  return (
    <section className={styles.featuredProjects}>
      <SectionHeading>Featured Projects.</SectionHeading>

      <div className={styles.row}>
        {isLoading ? (
          <ProjectsHighlightSkeleton />
        ) : (
          <ProjectsHighlight project={projects[0]} blurDataURL={blurDataUrls[0]} />
        )}

        {isLoading ? (
          <ProjectsCarouselSkeleton />
        ) : (
          <ProjectsCarousel
            projects={projects.slice(1)}
            totalPages={totalPages}
            chunkSize={chunkSize}
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;

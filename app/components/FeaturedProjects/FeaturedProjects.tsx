import { useProjectStore } from '@/app/store';
import { useFeaturedProjects } from '@/app/home/_hooks/useFeaturedProjects';
import SectionHeading from '../SectionHeading/SectionHeading';
import ProjectHighlight from '@/app/home/_components/ProjectHighlight/ProjectHighlight';
import ProjectHighlightSkeleton from '../ProjectHighlightSkeleton/ProjectHighlightSkeleton';
import ProjectCarousel from '@/app/home/_components/ProjectCarousel/ProjectCarousel';
import ProjectCarouselSkeleton from '../ProjectCarouselSkeleton/ProjectCarouselSkeleton';

import styles from './FeaturedProjects.module.scss';

const TOTAL_PAGES = 3;
const CHUNK_SIZE = 4;

const FeaturedProjects = () => {
  const projects = useProjectStore((s) => s.projects);

  const { isLoading, blurDataURLs } = useFeaturedProjects(
    projects,
    TOTAL_PAGES,
    CHUNK_SIZE
  );

  return (
    <section className={styles.featuredProjects}>
      <SectionHeading>Featured Projects.</SectionHeading>

      <div className={styles.row}>
        {isLoading ? (
          <ProjectHighlightSkeleton />
        ) : (
          <ProjectHighlight project={projects[0]} blurDataURL={blurDataURLs[0]} />
        )}

        {isLoading ? (
          <ProjectCarouselSkeleton />
        ) : (
          <ProjectCarousel
            projects={projects.slice(1)}
            totalPages={TOTAL_PAGES}
            chunkSize={CHUNK_SIZE}
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedProjects;

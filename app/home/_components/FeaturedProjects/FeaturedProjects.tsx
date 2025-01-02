import { useProjectStore } from '@/app/store';
import { useFeaturedProjectsState } from '@/app/contexts/FeaturedProjectsContext';
import { useFeaturedProjects } from '@/app/home/_hooks/useFeaturedProjects';
import SectionHeading from '../../../components/SectionHeading/SectionHeading';
import ProjectsHighlight from '@/app/home/_components/ProjectsHighlight/ProjectsHighlight';
import ProjectsHighlightSkeleton from '@/app/home/_components/ProjectsHighlightSkeleton/ProjectsHighlightSkeleton';
import ProjectsCarousel from '@/app/home/_components/ProjectsCarousel/ProjectsCarousel';
import ProjectsCarouselSkeleton from '@/app/home/_components/ProjectsCarouselSkeleton/ProjectsCarouselSkeleton';

import styles from './FeaturedProjects.module.scss';

const TOTAL_PAGES = 3;
const CHUNK_SIZE = 4;

const FeaturedProjects = () => {
  const projects = useProjectStore((s) => s.projects);
  const { blurDataURLs } = useFeaturedProjectsState(['blurDataURLs']);

  const { isLoading } = useFeaturedProjects(
    projects,
    blurDataURLs,
    TOTAL_PAGES,
    CHUNK_SIZE
  );

  return (
    <section className={styles.featuredProjects}>
      <SectionHeading>Featured Projects.</SectionHeading>

      <div className={styles.row}>
        {isLoading ? (
          <ProjectsHighlightSkeleton />
        ) : (
          <ProjectsHighlight project={projects[0]} blurDataURL={blurDataURLs.get[0]} />
        )}

        {isLoading ? (
          <ProjectsCarouselSkeleton />
        ) : (
          <ProjectsCarousel
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

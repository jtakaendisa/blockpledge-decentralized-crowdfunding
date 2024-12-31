import { useEffect } from 'react';

import { useProjectStore } from '@/app/store';
import { useFeaturedProjectsState } from '@/app/contexts/FeaturedProjectsContext';
import useBlurDataURLs from '@/app/hooks/useBlurDataURLs';
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

  const { blurDataURLs } = useFeaturedProjectsState(['blurDataURLs']);

  const { getBlurDataURLs } = useBlurDataURLs();

  const isLoading = !projects.length || !blurDataURLs.get.length;

  useEffect(() => {
    const fetchData = async () => {
      const imageUrls = projects
        .slice(0, TOTAL_PAGES * CHUNK_SIZE + 1)
        .map((project) => project.imageURLs[0]);

      const { blurDataURLs: bdURLs } = await getBlurDataURLs(imageUrls);

      blurDataURLs.set(bdURLs);
    };

    if (projects.length) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, getBlurDataURLs]);

  return (
    <section className={styles.featuredProjects}>
      <SectionHeading>Featured Projects.</SectionHeading>
      <div className={styles.row}>
        {isLoading ? (
          <ProjectHighlightSkeleton />
        ) : (
          <ProjectHighlight project={projects[0]} blurDataURL={blurDataURLs.get[0]} />
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

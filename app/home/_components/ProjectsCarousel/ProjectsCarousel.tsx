import { Project } from '@/app/entities';
import { useProjectsCarousel } from '../../_hooks/useProjectsCarousel';
import ProjectsCarouselGrid from '../ProjectsCarouselGrid/ProjectsCarouselGrid';
import ProjectsCarouselPagination from '../ProjectsCarouselPagination/ProjectsCarouselPagination';

import styles from './ProjectsCarousel.module.scss';

interface Props {
  projects: Project[];
  totalPages: number;
  chunkSize: number;
}

const ProjectsCarousel = ({ projects, totalPages, chunkSize }: Props) => {
  const { selectedPage, handlePageSelect, handlePageChange } = useProjectsCarousel();

  return (
    <div className={styles.projectCarousel}>
      <ProjectsCarouselGrid
        projects={projects}
        selectedPage={selectedPage}
        chunkSize={chunkSize}
      />
      <ProjectsCarouselPagination
        selectedPage={selectedPage}
        totalPages={totalPages}
        onSelect={handlePageSelect}
        onChange={handlePageChange.bind(null, totalPages)}
      />
    </div>
  );
};

export default ProjectsCarousel;

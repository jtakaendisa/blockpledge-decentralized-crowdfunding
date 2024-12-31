import { Project } from '@/app/store';
import useProjectCarousel from '../../_hooks/useProjectCarousel';
import ProjectCarouselGrid from '../ProjectCarouselGrid/ProjectCarouselGrid';
import ProjectCarouselPagination from '../ProjectCarouselPagination/ProjectCarouselPagination';

import styles from './ProjectCarousel.module.scss';

interface Props {
  projects: Project[];
  totalPages: number;
  chunkSize: number;
}

const ProjectCarousel = ({ projects, totalPages, chunkSize }: Props) => {
  const { selectedPage, handlePageSelect, handlePageChange } = useProjectCarousel();

  return (
    <div className={styles.projectCarousel}>
      <ProjectCarouselGrid
        projects={projects}
        selectedPage={selectedPage}
        chunkSize={chunkSize}
      />
      <ProjectCarouselPagination
        selectedPage={selectedPage}
        totalPages={totalPages}
        onSelect={handlePageSelect}
        onChange={handlePageChange.bind(null, totalPages)}
      />
    </div>
  );
};

export default ProjectCarousel;

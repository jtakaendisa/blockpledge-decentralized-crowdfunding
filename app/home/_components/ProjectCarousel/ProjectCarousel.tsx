import { Project } from '@/app/store';
import useProjectCarousel from '../../hooks/useProjectCarousel';
import ProjectGrid from '../ProjectGrid/ProjectGrid';
import ProjectPagination from '../ProjectPagination/ProjectPagination';

import styles from './ProjectCarousel.module.scss';

interface Props {
  projects: Project[];
}

const TOTAL_PAGES = 3;

const ProjectCarousel = ({ projects }: Props) => {
  const { selectedPage, handlePageSelect, handlePageChange } = useProjectCarousel();

  return (
    <div className={styles.projectCarousel}>
      <ProjectGrid projects={projects} selectedPage={selectedPage} />
      <ProjectPagination
        selectedPage={selectedPage}
        totalPages={TOTAL_PAGES}
        onSelect={handlePageSelect}
        onChange={handlePageChange.bind(null, TOTAL_PAGES)}
      />
    </div>
  );
};

export default ProjectCarousel;

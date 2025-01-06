import { Project } from '@/app/entities';

import { useCarouselPagination } from '@/app/hooks/useCarouselPagination';
import DashboardProjectsCarouselGrid from '../DashboardProjectsCarouselGrid/DashboardProjectsCarouselGrid';
import DashboardProjectsCarouselPagination from '../DashboardProjectsCarouselPagination/DashboardProjectsCarouselPagination';

import styles from './DashboardProjectsCarousel.module.scss';

interface Props {
  projects: Project[];
}

const CHUNK_SIZE = 12;

const DashboardProjectsCarousel = ({ projects }: Props) => {
  const totalPages = Math.ceil(projects.length / CHUNK_SIZE);

  const { selectedPage, handlePageChange } = useCarouselPagination(totalPages);

  return (
    <div className={styles.dashboardProjectsCarousel}>
      <DashboardProjectsCarouselGrid
        projects={projects}
        selectedPage={selectedPage}
        chunkSize={CHUNK_SIZE}
      />

      {totalPages > 1 && (
        <DashboardProjectsCarouselPagination
          selectedPage={selectedPage}
          totalPages={totalPages}
          onChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default DashboardProjectsCarousel;

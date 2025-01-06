import ProjectsCarouselPaginationArrow from '../ProjectsCarouselPaginationArrow/ProjectsCarouselPaginationArrow';

import styles from './DashboardProjectsCarouselPagination.module.scss';

interface Props {
  selectedPage: number;
  totalPages: number;
  onChange: (increment: number) => void;
}

const isDisabled = (selectedPage: number, limit: number) => selectedPage === limit;

const DashboardProjectsCarouselPagination = ({
  selectedPage,
  totalPages,
  onChange,
}: Props) => {
  return (
    <div className={styles.pagination}>
      <ProjectsCarouselPaginationArrow
        icon="chevronLeft"
        disabled={isDisabled(selectedPage, 1)}
        onChange={onChange}
      />

      <span className={styles.pageIndicator}>
        {selectedPage} of {totalPages}
      </span>

      <ProjectsCarouselPaginationArrow
        icon="chevronRight"
        disabled={isDisabled(selectedPage, totalPages)}
        onChange={onChange}
      />
    </div>
  );
};

export default DashboardProjectsCarouselPagination;

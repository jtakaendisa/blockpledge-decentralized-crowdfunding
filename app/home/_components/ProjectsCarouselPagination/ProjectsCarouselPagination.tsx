import ProjectsCarouselPaginationArrow from '../ProjectsCarouselPaginationArrow/ProjectsCarouselPaginationArrow';
import ProjectsCarouselPaginationList from '../ProjectsCarouselPaginationList/ProjectsCarouselPaginationList';

import styles from './ProjectsCarouselPagination.module.scss';

interface Props {
  selectedPage: number;
  totalPages: number;
  onSelect: (selectedPage: number) => void;
  onChange: (mode: 'increment' | 'decrement') => void;
}

const isDisabled = (selectedPage: number, limit: number) => selectedPage === limit;

const ProjectsCarouselPagination = ({
  selectedPage,
  totalPages,
  onSelect,
  onChange,
}: Props) => {
  return (
    <div className={styles.pagination}>
      <ProjectsCarouselPaginationArrow
        icon="chevronLeft"
        disabled={isDisabled(selectedPage, 1)}
        onChange={onChange}
      />
      <ProjectsCarouselPaginationList
        selectedPage={selectedPage}
        totalPages={totalPages}
        onSelect={onSelect}
      />
      <ProjectsCarouselPaginationArrow
        icon="chevronRight"
        disabled={isDisabled(selectedPage, totalPages)}
        onChange={onChange}
      />
    </div>
  );
};

export default ProjectsCarouselPagination;

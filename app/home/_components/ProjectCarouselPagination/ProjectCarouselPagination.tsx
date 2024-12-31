import ProjectCarouselPaginationArrow from '../ProjectCarouselPaginationArrow/ProjectCarouselPaginationArrow';
import ProjectCarouselPaginationList from '../ProjectCarouselPaginationList/ProjectCarouselPaginationList';

import styles from './ProjectCarouselPagination.module.scss';

interface Props {
  selectedPage: number;
  totalPages: number;
  onSelect: (selectedPage: number) => void;
  onChange: (mode: 'increment' | 'decrement') => void;
}

const isDisabled = (selectedPage: number, limit: number) => selectedPage === limit;

const ProjectCarouselPagination = ({
  selectedPage,
  totalPages,
  onSelect,
  onChange,
}: Props) => {
  return (
    <div className={styles.pagination}>
      <ProjectCarouselPaginationArrow
        icon="chevronLeft"
        disabled={isDisabled(selectedPage, 1)}
        onChange={onChange}
      />
      <ProjectCarouselPaginationList
        selectedPage={selectedPage}
        totalPages={totalPages}
        onSelect={onSelect}
      />
      <ProjectCarouselPaginationArrow
        icon="chevronRight"
        disabled={isDisabled(selectedPage, totalPages)}
        onChange={onChange}
      />
    </div>
  );
};

export default ProjectCarouselPagination;

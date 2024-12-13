import ProjectPaginationArrow from '../ProjectPaginationArrow/ProjectPaginationArrow';
import ProjectPaginationList from '../ProjectPaginationList/ProjectPaginationList';

import styles from './ProjectPagination.module.scss';

interface Props {
  selectedPage: number;
  totalPages: number;
  onSelect: (selectedPage: number) => void;
  onChange: (mode: 'increment' | 'decrement') => void;
}

const isDisabled = (selectedPage: number, limit: number) => selectedPage === limit;

const ProjectPagination = ({ selectedPage, totalPages, onSelect, onChange }: Props) => {
  return (
    <div className={styles.pagination}>
      <ProjectPaginationArrow
        icon="chevronLeft"
        disabled={isDisabled(selectedPage, 1)}
        onChange={onChange}
      />
      <ProjectPaginationList
        selectedPage={selectedPage}
        totalPages={totalPages}
        onSelect={onSelect}
      />
      <ProjectPaginationArrow
        icon="chevronRight"
        disabled={isDisabled(selectedPage, totalPages)}
        onChange={onChange}
      />
    </div>
  );
};

export default ProjectPagination;

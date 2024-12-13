import { generateIncrementingArray } from '@/app/utils';
import ProjectPaginationListItem from '../ProjectPaginationListItem/ProjectPaginationListItem';

import styles from './ProjectPaginationList.module.scss';

interface Props {
  selectedPage: number;
  totalPages: number;
  onSelect: (selectedPage: number) => void;
}

const ProjectPaginationList = ({ selectedPage, totalPages, onSelect }: Props) => {
  return (
    <div className={styles.paginationList}>
      {generateIncrementingArray(totalPages).map((pageNumber) => (
        <ProjectPaginationListItem
          key={pageNumber}
          pageNumber={pageNumber}
          selectedPage={selectedPage}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default ProjectPaginationList;

import { generateIncrementingArray } from '@/app/utils';
import ProjectCarouselPaginationListItem from '../ProjectCarouselPaginationListItem/ProjectCarouselPaginationListItem';

import styles from './ProjectCarouselPaginationList.module.scss';

interface Props {
  selectedPage: number;
  totalPages: number;
  onSelect: (selectedPage: number) => void;
}

const ProjectCarouselPaginationList = ({
  selectedPage,
  totalPages,
  onSelect,
}: Props) => {
  return (
    <div className={styles.paginationList}>
      {generateIncrementingArray(totalPages).map((pageNumber) => (
        <ProjectCarouselPaginationListItem
          key={pageNumber}
          pageNumber={pageNumber}
          selectedPage={selectedPage}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default ProjectCarouselPaginationList;

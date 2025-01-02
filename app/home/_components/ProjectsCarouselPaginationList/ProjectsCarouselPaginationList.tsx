import { generateIncrementingArray } from '@/app/utils';
import ProjectsCarouselPaginationListItem from '../ProjectsCarouselPaginationListItem/ProjectsCarouselPaginationListItem';

import styles from './ProjectsCarouselPaginationList.module.scss';

interface Props {
  selectedPage: number;
  totalPages: number;
  onSelect: (selectedPage: number) => void;
}

const ProjectsCarouselPaginationList = ({
  selectedPage,
  totalPages,
  onSelect,
}: Props) => {
  return (
    <div className={styles.paginationList}>
      {generateIncrementingArray(totalPages).map((pageNumber) => (
        <ProjectsCarouselPaginationListItem
          key={pageNumber}
          pageNumber={pageNumber}
          selectedPage={selectedPage}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
};

export default ProjectsCarouselPaginationList;

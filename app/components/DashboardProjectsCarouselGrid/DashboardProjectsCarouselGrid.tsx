import { useMemo } from 'react';

import { Project } from '@/app/entities';
import CompactProjectCard from '../CompactProjectCard/CompactProjectCard';

import styles from './DashboardProjectsCarouselGrid.module.scss';

interface Props {
  projects: Project[];
  selectedPage: number;
  chunkSize: number;
}

const DashboardProjectsCarouselGrid = ({
  projects,
  selectedPage,
  chunkSize,
}: Props) => {
  const filteredProjects = useMemo(() => {
    const startIndex = (selectedPage - 1) * chunkSize;
    const endIndex = startIndex + chunkSize;

    return projects.slice(startIndex, endIndex);
  }, [projects, selectedPage, chunkSize]);

  const gridRef = (element: HTMLDivElement) => {
    if (element) {
      const gridRows =
        projects.length > 9 ? 4 : projects.length > 6 ? 3 : projects.length > 3 ? 2 : 1;

      element.style.setProperty('--grid-rows', gridRows.toString());
    }
  };

  return (
    <div ref={gridRef} className={styles.grid}>
      {filteredProjects.map((filteredProject) => (
        <CompactProjectCard key={filteredProject.id} project={filteredProject} />
      ))}
    </div>
  );
};

export default DashboardProjectsCarouselGrid;

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

  return (
    <div className={styles.grid}>
      {filteredProjects.map((filteredProject) => (
        <CompactProjectCard key={filteredProject.id} project={filteredProject} />
      ))}
    </div>
  );
};

export default DashboardProjectsCarouselGrid;

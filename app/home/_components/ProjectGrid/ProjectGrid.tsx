import { useMemo } from 'react';

import { Project } from '@/app/store';
import ProjectCardWithHoverReveal from '@/app/components/ProjectCardWithHoverReveal/ProjectCardWithHoverReveal';

import styles from './ProjectGrid.module.scss';

interface Props {
  projects: Project[];
  selectedPage: number;
}

const filterProjects = (
  projects: Project[],
  selectedPage: number,
  chunkSize: number
) => {
  const startIndex = selectedPage - 1;
  const endIndex = startIndex + chunkSize;

  return projects.slice(startIndex, endIndex);
};

const ProjectGrid = ({ projects, selectedPage }: Props) => {
  const filteredProjects = useMemo(
    () => filterProjects(projects, selectedPage, 4),
    [projects, selectedPage]
  );

  return (
    <div className={styles.grid}>
      {filteredProjects.map((project) => (
        <ProjectCardWithHoverReveal key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectGrid;

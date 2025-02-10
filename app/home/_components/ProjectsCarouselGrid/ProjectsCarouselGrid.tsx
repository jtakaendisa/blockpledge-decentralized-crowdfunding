import { useMemo } from 'react';

import { Project } from '@/app/entities';
import { useFeaturedProjectsContext } from '@/app/hooks/useFeaturedProjectsContext';
import ProjectCardWithHoverReveal from '../ProjectCardWithHoverReveal/ProjectCardWithHoverReveal';

import styles from './ProjectsCarouselGrid.module.scss';

interface Props {
  projects: Project[];
  selectedPage: number;
  chunkSize: number;
}

const ProjectsCarouselGrid = ({ projects, selectedPage, chunkSize }: Props) => {
  const { blurDataUrls } = useFeaturedProjectsContext();

  const filteredProjectsWithBlurData = useMemo(() => {
    const startIndex = (selectedPage - 1) * chunkSize;
    const endIndex = startIndex + chunkSize;

    // Filter projects and map each one with its corresponding blurDataURL
    return projects.slice(startIndex, endIndex).map((project, index) => ({
      ...project,
      blurDataURL: blurDataUrls[startIndex + index + 1],
    }));
  }, [projects, selectedPage, chunkSize, blurDataUrls]);

  return (
    <div className={styles.grid}>
      {filteredProjectsWithBlurData.map((project) => (
        <ProjectCardWithHoverReveal key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectsCarouselGrid;

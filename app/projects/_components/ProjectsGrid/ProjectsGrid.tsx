import { useRef } from 'react';

import { generateIncrementingArray } from '@/app/utils';
import { useProjectsGrid } from '../../_hooks/useProjectsGrid';
import ProjectsGridNoResults from '../ProjectsGridNoResults/ProjectsGridNoResults';
import ProjectCard from '../ProjectCard/ProjectCard';
import IntersectionObserverWithCallback from '../IntersectionObserverWithCallback/IntersectionObserverWithCallback';
import ProjectCardSkeleton from '../ProjectCardSkeleton/ProjectCardSkeleton';
import DefaultBlurDataURL from '@/public/images/defaultBlurDataURL.png';

import styles from './ProjectsGrid.module.scss';

const INITIAL_LIST_SIZE = 10;

const skeletons = generateIncrementingArray(INITIAL_LIST_SIZE);

const ProjectsGrid = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { projects, visibleProjects, shouldShowMoreProjects, increaseListSize } =
    useProjectsGrid(containerRef, INITIAL_LIST_SIZE);

  if (projects.length && !visibleProjects.length) {
    return <ProjectsGridNoResults />;
  }

  return (
    <section ref={containerRef} className={styles.projectsGrid}>
      {!projects.length
        ? skeletons.map((skeleton) => <ProjectCardSkeleton key={skeleton} />)
        : visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              blurDataURL={DefaultBlurDataURL.blurDataURL}
            />
          ))}

      {!!projects.length && (
        <IntersectionObserverWithCallback
          onIntersect={shouldShowMoreProjects ? increaseListSize : undefined}
        />
      )}
    </section>
  );
};

export default ProjectsGrid;

import { Project } from '@/app/store';

import ProjectCard from '@/app/components/ProjectCard/ProjectCard';

import styles from './ProjectHighlight.module.scss';

interface Props {
  project: Project;
}

const ProjectHighlight = ({ project }: Props) => {
  return (
    <div className={styles.highlight}>
      <ProjectCard project={project} />
    </div>
  );
};

export default ProjectHighlight;

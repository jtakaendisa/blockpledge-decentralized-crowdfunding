import { Project } from '@/app/store';
import ProjectDetailsImageGallery from '../ProjectDetailsImageGallery/ProjectDetailsImageGallery';
import ProjectDetailsContent from '../ProjectDetailsContent/ProjectDetailsContent';

import styles from './ProjectDetails.module.scss';

interface Props {
  project: Project;
}

const ProjectDetails = ({ project }: Props) => {
  const { imageURLs, title } = project;

  return (
    <div className={styles.details}>
      <ProjectDetailsImageGallery imageURLs={imageURLs} title={title} />
      <ProjectDetailsContent project={project} />
    </div>
  );
};

export default ProjectDetails;

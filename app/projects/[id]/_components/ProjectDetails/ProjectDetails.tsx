import { Project } from '@/app/store';
import ProjectDetailsImageGallery from '../ProjectDetailsImageGallery/ProjectDetailsImageGallery';
import ProjectDetailsContent from '../ProjectDetailsContent/ProjectDetailsContent';

import styles from './ProjectDetails.module.scss';

interface Props {
  project: Project;
  blurDataURLs: string[];
}

const ProjectDetails = ({ project, blurDataURLs }: Props) => {
  const { imageURLs, title } = project;

  return (
    <div className={styles.details}>
      <ProjectDetailsImageGallery
        imageURLs={imageURLs}
        title={title}
        blurDataURLs={blurDataURLs}
      />
      <ProjectDetailsContent project={project} />
    </div>
  );
};

export default ProjectDetails;

import { Project } from '@/app/entities';
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
    <section className={styles.details}>
      <ProjectDetailsImageGallery
        imageURLs={imageURLs}
        title={title}
        blurDataURLs={blurDataURLs}
      />
      <ProjectDetailsContent project={project} />
    </section>
  );
};

export default ProjectDetails;

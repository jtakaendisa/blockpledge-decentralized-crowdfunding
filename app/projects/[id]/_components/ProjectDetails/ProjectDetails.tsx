import ProjectDetailsImageGallery from '../ProjectDetailsImageGallery/ProjectDetailsImageGallery';
import ProjectDetailsContent from '../ProjectDetailsContent/ProjectDetailsContent';

import styles from './ProjectDetails.module.scss';

const ProjectDetails = () => {
  return (
    <section className={styles.details}>
      <ProjectDetailsImageGallery />
      <ProjectDetailsContent />
    </section>
  );
};

export default ProjectDetails;

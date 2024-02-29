import Header from '@/app/components/Header/Header';

import styles from './page.module.scss';
import ProjectDetails from './_components/ProjectDetails/ProjectDetails';
import ProjectBackers from './_components/ProjectBackers/ProjectBackers';

interface Props {
  params: {
    id: string;
  };
}

const ProjectPage = ({ params: { id } }: Props) => {
  return (
    <div className={styles.projectPage}>
      <Header />
      <ProjectDetails />
      <ProjectBackers />
    </div>
  );
};

export default ProjectPage;

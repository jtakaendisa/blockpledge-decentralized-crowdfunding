import Header from '@/app/components/Header/Header';
import ProjectDetails from './_components/ProjectDetails/ProjectDetails';
import ProjectBackers from './_components/ProjectBackers/ProjectBackers';

import styles from './page.module.scss';

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

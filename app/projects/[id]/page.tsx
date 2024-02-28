import Header from '@/app/components/Header/Header';

import styles from './page.module.scss';
import ProjectDetails from './_components/ProjectDetails/ProjectDetails';

interface Props {
  params: {
    id: string;
  };
}

const ProjectPage = ({ params: { id } }: Props) => {
  return (
    <div className={styles.projectPage}>
      <Header />
      <section>
        <ProjectDetails />
      </section>
    </div>
  );
};

export default ProjectPage;

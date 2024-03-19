import Header from '../components/Header/Header';
import ProjectsGrid from '../components/ProjectsGrid/ProjectsGrid';

import styles from './page.module.scss';

const UserDashBoardPage = () => {
  return (
    <div className={styles.dashboardPage}>
      <Header />
      <section>
        <h2>Projects You&apos;re Following</h2>
        <ProjectsGrid following />
      </section>
      <section>
        <h2>Projects You&apos;ve Backed</h2>
        <ProjectsGrid backed />
      </section>
    </div>
  );
};

export default UserDashBoardPage;

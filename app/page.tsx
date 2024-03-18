import { ToastContainer } from 'react-toastify';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProjectsGrid from './components/ProjectsGrid/ProjectsGrid';

import styles from './page.module.scss';
import ProjectsRow from './components/ProjectsRow/ProjectsRow';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Header />
      <Hero />
      <ProjectsRow />
      <ProjectsGrid />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default HomePage;

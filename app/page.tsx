import { ToastContainer } from 'react-toastify';

import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';

import styles from './page.module.scss';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <Header />
      <Hero />
      <Projects />
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

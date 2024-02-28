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
    </div>
  );
};

export default HomePage;

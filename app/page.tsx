import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';

import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
      <Header />
      <Hero />
      <Projects />
    </div>
  );
}

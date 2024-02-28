import Button from '../Button/Button';

import styles from './Hero.module.scss';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>
        <span>Bring creative projects to life on</span>
        <br />
        <span>Genesis.</span>
      </h1>
      <div className={styles.buttons}>
        <Button>Add Project</Button>
        <Button inverted>Back Projects</Button>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.sum}>{0}</span>
          <span>Projects</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.sum}>{0}</span>
          <span>Backings</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.sum}>{0} ETH</span>
          <span>Donated</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;

'use client';

import { useModalStore, useProjectStore } from '@/app/store';
import Button from '../Button/Button';
import AddProjectModal from '../modals/AddProjectModal/AddProjectModal';

import styles from './Hero.module.scss';

const Hero = () => {
  const addIsOpen = useModalStore((s) => s.addIsOpen);
  const openModal = useModalStore((s) => s.setIsOpen);
  const stats = useProjectStore((s) => s.stats);

  const { totalBacking, totalDonations, totalProjects } = stats;

  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>
        <span>Bring creative projects to life on</span>
        <br />
        <span>BlockPledge.</span>
      </h1>
      <div className={styles.buttons}>
        <Button onClick={() => openModal('add')}>Add Project</Button>
        <Button inverted>Back Projects</Button>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.sum}>{totalProjects}</span>
          <span>Projects</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.sum}>{totalBacking}</span>
          <span>Backings</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.sum}>{totalDonations} ETH</span>
          <span>Donated</span>
        </div>
      </div>
      {addIsOpen && <AddProjectModal />}
    </section>
  );
};

export default Hero;

'use client';

import { useState } from 'react';

import { Stats } from '@/app/store';
import Button from '../Button/Button';
import AddProjectModal from '../modals/AddProjectModal/AddProjectModal';

import styles from './Hero.module.scss';

interface Props {
  stats: Stats;
}

const Hero = ({ stats }: Props) => {
  const { totalBackings, totalDonations, totalProjects } = stats;

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <section className={styles.hero}>
      <h1 className={styles.heading}>
        <span>Bring creative projects to life on</span>
        <br />
        <span>BlockPledge.</span>
      </h1>
      <div className={styles.buttons}>
        <Button onClick={() => setModalIsOpen(true)}>Add Project</Button>
        <Button inverted>Back Projects</Button>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.sum}>{totalProjects}</span>
          <span>{totalProjects === 1 ? 'Project' : 'Projects'}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.sum}>{totalBackings}</span>
          <span>{totalBackings === 1 ? 'Backing' : 'Backings'}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.sum}>{totalDonations} ETH</span>
          <span>Donated</span>
        </div>
      </div>
      {modalIsOpen && <AddProjectModal closeModal={() => setModalIsOpen(false)} />}
    </section>
  );
};

export default Hero;

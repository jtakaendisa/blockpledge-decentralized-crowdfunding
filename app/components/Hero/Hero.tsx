'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';

import { Stats } from '@/app/store';
import Button from '../Button/Button';
import AddProjectModal from '../modals/AddProjectModal/AddProjectModal';

import styles from './Hero.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  stats: Stats;
}

const Hero = ({ stats }: Props) => {
  const { totalBackings, totalDonations, totalProjects } = stats;

  const router = useRouter();
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
        <Button inverted onClick={() => router.push('/projects')}>
          Back Projects
        </Button>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.sum}>
            {totalProjects === 0 ? <Skeleton width={56} height={20} /> : totalProjects}
          </span>
          <span>
            {totalProjects === 0 ? (
              <Skeleton width={56} height={12} />
            ) : totalProjects === 1 ? (
              'Project'
            ) : (
              'Projects'
            )}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.sum}>
            {totalProjects === 0 ? <Skeleton width={56} height={20} /> : totalBackings}
          </span>
          <span>
            {totalProjects === 0 ? (
              <Skeleton width={56} height={12} />
            ) : totalBackings === 1 ? (
              'Backing'
            ) : (
              'Backings'
            )}
          </span>
        </div>
        <div className={styles.stat}>
          <span className={styles.sum}>
            {totalProjects === 0 ? <Skeleton width={56} height={20} /> : totalDonations}
          </span>
          <span>
            {totalProjects === 0 ? <Skeleton width={56} height={12} /> : 'Donated'}
          </span>
        </div>
      </div>
      {modalIsOpen && <AddProjectModal closeModal={() => setModalIsOpen(false)} />}
    </section>
  );
};

export default Hero;

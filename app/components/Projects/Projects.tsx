'use client';

import Link from 'next/link';
import Image from 'next/image';
import Identicons from 'react-identicons';

import robot from '@/public/images/robot.jpg';

import styles from './Projects.module.scss';

const Projects = () => {
  return (
    <section className={styles.projects}>
      <div className={styles.cards}>
        {[1, 2, 3, 4, 5, 6].map((c, idx) => (
          <ProjectCard key={idx} card={c} />
        ))}
      </div>
    </section>
  );
};

const ProjectCard = ({ card }: any) => {
  return (
    <div className={styles.card}>
      <Link href={`/projects/${card}`} className={styles.link}>
        <div className={styles.image}>
          <Image src={robot} alt="robot" />
        </div>
        <div className={styles.info}>
          <h5>Creating a Household Robot</h5>
          <div className={styles.ownerDetails}>
            <Identicons string="0x15...1ea2" size={15} />
            <small>0x15...1ea2</small>
          </div>
          <small className={styles.remainingTime}>2 days left</small>
          <div className={styles.progressOut}>
            <div className={styles.progressIn} style={{ width: '50%' }} />
          </div>
          <div className={styles.backingInfo}>
            <small>{14} Backers</small>
            <small>Open</small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Projects;

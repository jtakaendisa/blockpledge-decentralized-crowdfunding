'use client';

import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

import { useProjectStore } from '@/app/store';
import SlideUpText from '../SlideUpText/SlideUpText';
import FlipButton from '../FlipButton/FlipButton';
import AddProjectModal from '../modals/AddProjectModal/AddProjectModal';

import styles from './Hero.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import usePageNavigation from '@/app/hooks/usePageNavigation';
import ImageCollage from '../ImageCollage/ImageCollage';

const Hero = () => {
  const stats = useProjectStore((s) => s.stats);

  const { totalBackings, totalDonations, totalProjects } = stats;

  const { navigateToPage } = usePageNavigation();

  const statsArray = [
    {
      metric: 'Active Projects',
      value: totalProjects,
    },
    {
      metric: 'Donations',
      value: totalBackings,
    },
    {
      metric: 'Total Funded',
      value: totalDonations,
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalState = () => setIsModalOpen((prev) => !prev);

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.textContent}>
        <div className={styles.headingContainer}>
          <h1 className={styles.headingSmall}>
            <SlideUpText playAnimation={true} duration={0.8} hidden>
              Bring Creative Projects To Life On
            </SlideUpText>
          </h1>
          <h1 className={styles.headingLarge}>
            <SlideUpText playAnimation={true} duration={0.8} delay={0.5} hidden>
              BLOCKPLEDGE.
            </SlideUpText>
          </h1>
        </div>
        <div className={styles.buttons}>
          <FlipButton onClick={toggleModalState} inverted>
            Create Project
          </FlipButton>
          <FlipButton onClick={() => navigateToPage('projects')}>
            View All Projects
          </FlipButton>
        </div>
      </div>
      <div className={styles.imageCollage}>
        <ImageCollage />
      </div>
      {/* <h1 className={styles.heading}>
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
      </div> */}
      <div className={styles.stats}>
        {statsArray.map(({ metric, value }) => (
          <div key={metric} className={styles.stat}>
            <span className={styles.value}>{value}</span>
            <span className={styles.metric}>{metric}</span>
          </div>
        ))}
      </div>
      {isModalOpen && <AddProjectModal closeModal={toggleModalState} />}
    </section>
  );
};

export default Hero;

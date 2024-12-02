'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { useProjectStore } from '@/app/store';
import usePageNavigation from '@/app/hooks/usePageNavigation';
import { colors } from '@/app/constants';
import StatCard from '../StatCard/StatCard';
import ImageCollage from '../ImageCollage/ImageCollage';
import SlideUpText from '../SlideUpText/SlideUpText';
import FlipButton from '../FlipButton/FlipButton';
import AddProjectModal from '../modals/AddProjectModal/AddProjectModal';

import styles from './Hero.module.scss';
import 'react-loading-skeleton/dist/skeleton.css';

const { whiteSolid, lightGray, darkGreen } = colors;

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
          <FlipButton
            onClick={toggleModalState}
            textColor1={whiteSolid}
            backgroundColor1={darkGreen}
            textColor2={darkGreen}
            backgroundColor2={lightGray}
          >
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
      <motion.div className={styles.stats} initial="initial" animate="enter">
        {statsArray.map((stat, index) => (
          <StatCard key={stat.metric} stat={stat} index={index} />
        ))}
      </motion.div>
      {isModalOpen && <AddProjectModal closeModal={toggleModalState} />}
    </section>
  );
};

export default Hero;

'use client';

import { useState } from 'react';

import CallToAction from '../CallToAction/CallToAction';
import ImageCollage from '../ImageCollage/ImageCollage';
import StatCards from '../StatCards/StatCards';
import AddProjectModal from '../modals/AddProjectModal/AddProjectModal';

import styles from './Hero.module.scss';

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModalState = () => setIsModalOpen((prev) => !prev);

  return (
    <section id="hero" className={styles.hero}>
      <CallToAction onToggle={toggleModalState} />
      <ImageCollage delay={1.25} />
      <StatCards />
      {isModalOpen && <AddProjectModal closeModal={toggleModalState} />}
    </section>
  );
};

export default Hero;

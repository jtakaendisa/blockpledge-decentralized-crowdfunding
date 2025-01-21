'use client';

import { AnimatePresence } from 'framer-motion';

import { useProjectModals } from '@/app/hooks/useProjectModals';
import CallToAction from '../CallToAction/CallToAction';
import ImageCollage from '../ImageCollage/ImageCollage';
import StatCards from '../StatCards/StatCards';
import CreateProjectModal from '@/app/projects/[id]/_components/modals/CreateProjectModal/CreateProjectModal';

import styles from './Hero.module.scss';

const Hero = () => {
  const { isAddProjectModalOpen, toggleAddProjectModalState } = useProjectModals();

  return (
    <section id="hero" className={styles.hero}>
      <CallToAction onToggle={toggleAddProjectModalState} />
      <ImageCollage delay={1.25} />
      <StatCards />

      <AnimatePresence>
        {isAddProjectModalOpen && (
          <CreateProjectModal onClose={toggleAddProjectModalState} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Hero;

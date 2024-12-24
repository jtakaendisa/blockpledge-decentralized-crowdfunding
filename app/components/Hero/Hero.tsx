import useProjectModals from '@/app/hooks/useProjectModals';
import CallToAction from '../CallToAction/CallToAction';
import ImageCollage from '../ImageCollage/ImageCollage';
import StatCards from '../StatCards/StatCards';
import AddProjectModal from '../modals/AddProjectModal/AddProjectModal';

import styles from './Hero.module.scss';

const Hero = () => {
  const { isAddProjectModalOpen, toggleAddProjectModalState } = useProjectModals();

  return (
    <section id="hero" className={styles.hero}>
      <CallToAction onToggle={toggleAddProjectModalState} />
      <ImageCollage delay={1.25} />
      <StatCards />

      {isAddProjectModalOpen && (
        <AddProjectModal closeModal={toggleAddProjectModalState} />
      )}
    </section>
  );
};

export default Hero;

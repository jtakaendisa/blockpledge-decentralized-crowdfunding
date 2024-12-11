import { motion } from 'framer-motion';

import useHeadingReveal from '@/app/hooks/useHeadingReveal';
import StaggeredText from '../StaggeredText/StaggeredText';

import styles from './SectionHeading.module.scss';

interface Props {
  children: string;
}

const SectionHeading = ({ children }: Props) => {
  const { playAnimation, handleViewportEnter } = useHeadingReveal();

  return (
    <motion.h2 onViewportEnter={handleViewportEnter} className={styles.heading}>
      <StaggeredText playAnimation={playAnimation} hidden>
        {children}
      </StaggeredText>
    </motion.h2>
  );
};

export default SectionHeading;

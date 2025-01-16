import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

import styles from './ModalBackdrop.module.scss';

interface Props {
  children: ReactNode;
}

const revealVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: 'easeInOut',
    },
  },
  exit: {
    opacity: 0,
  },
};

const slideUpVariants: Variants = {
  initial: {
    y: '10%',
  },
  animate: {
    y: 0,
    transition: {
      duration: 0.65,
      ease: 'easeInOut',
    },
  },
  exit: {
    y: '-10%',
  },
};

const ModalBackdrop = ({ children }: Props) => {
  return (
    <motion.div
      className={styles.backdrop}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={revealVariants}
    >
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideUpVariants}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default ModalBackdrop;

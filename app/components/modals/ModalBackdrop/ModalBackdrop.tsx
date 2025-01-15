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

const ModalBackdrop = ({ children }: Props) => {
  return (
    <motion.div
      className={styles.backdrop}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={revealVariants}
    >
      {children}
    </motion.div>
  );
};

export default ModalBackdrop;

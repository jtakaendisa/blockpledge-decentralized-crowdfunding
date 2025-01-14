import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

import styles from './FormErrorMessage.module.scss';

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
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
  },
};

const FormErrorMessage = ({ children }: Props) => {
  return (
    <motion.p
      className={styles.error}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={revealVariants}
    >
      {children}
    </motion.p>
  );
};

export default FormErrorMessage;

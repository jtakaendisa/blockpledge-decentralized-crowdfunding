import { forwardRef, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

import styles from './TopNavDropdownMenu.module.scss';

interface Props {
  children: ReactNode;
}

const mountVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.35,
    },
  },
  exit: {
    opacity: 0,
  },
};

const TopNavDropdownMenu = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <motion.div
      ref={ref}
      className={styles.dropdownMenu}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={mountVariants}
    >
      {children}
    </motion.div>
  );
});

TopNavDropdownMenu.displayName = 'TopNavDropdownMenu';

export default TopNavDropdownMenu;

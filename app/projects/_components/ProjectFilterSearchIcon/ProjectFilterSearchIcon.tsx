import { ReactNode } from 'react';
import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';

import styles from './ProjectFilterSearchIcon.module.scss';

interface Props {
  children: ReactNode;
  align: 'left' | 'right';
  onClick?: () => void;
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

const ProjectFilterSearchIcon = ({ children, align, onClick }: Props) => {
  return (
    <motion.div
      onClick={() => onClick?.()}
      className={classNames({
        [styles.icon]: true,
        [styles[align]]: true,
      })}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={revealVariants}
    >
      {children}
    </motion.div>
  );
};

export default ProjectFilterSearchIcon;

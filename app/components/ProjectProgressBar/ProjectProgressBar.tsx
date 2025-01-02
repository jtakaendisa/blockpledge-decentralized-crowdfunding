import classNames from 'classnames';
import { motion, Variants } from 'framer-motion';

import styles from './ProjectProgressBar.module.scss';

interface Props {
  raised: number;
  cost: number;
  height?: number;
  flatEdge?: boolean;
}

const progressVariants: Variants = {
  initial: {
    width: 0,
  },
  animate: (width) => ({
    width,
    transition: {
      duration: 0.85,
      ease: 'easeInOut',
    },
  }),
};

const ProjectProgressBar = ({ raised, cost, height = 4, flatEdge }: Props) => {
  const progressPercentage = (raised / cost) * 100;

  return (
    <div
      style={{ height }}
      className={classNames({
        [styles.progressBackground]: true,
        [styles.flatEdge]: flatEdge,
      })}
    >
      <motion.div
        className={styles.progressForeground}
        initial="initial"
        animate="animate"
        custom={`${progressPercentage}%`}
        variants={progressVariants}
      />
    </div>
  );
};

export default ProjectProgressBar;

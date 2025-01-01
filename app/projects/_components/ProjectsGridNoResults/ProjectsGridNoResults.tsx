import { motion } from 'framer-motion';

import { colors } from '@/app/constants';
import NoResults from '@/app/components/icons/NoResults';

import styles from './ProjectsGridNoResults.module.scss';

const revealVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.7,
    },
  },
};

const { darkGreen } = colors;

const ProjectsGridNoResults = () => {
  return (
    <motion.div
      className={styles.projectsGridNoResults}
      initial="initial"
      animate="animate"
      variants={revealVariants}
    >
      <div className={styles.content}>
        <NoResults fill={darkGreen} size={100} />
        <p className={styles.text}>No projects to display.</p>
      </div>
    </motion.div>
  );
};

export default ProjectsGridNoResults;

import { ReactNode } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

import useTopNavMenuIconAnimations from '@/app/hooks/useTopNavMenuIconAnimations';

import styles from './TopNavAuthMenuContentItem.module.scss';

interface Props {
  label: string;
  icon: ReactNode;
}

const TopNavAuthMenuContentItem = ({ label, icon }: Props) => {
  const controls = useAnimationControls();

  const { toggleHoveredState } = useTopNavMenuIconAnimations(controls);

  return (
    <div
      className={styles.contentItem}
      onMouseEnter={toggleHoveredState}
      onMouseLeave={toggleHoveredState}
    >
      <motion.span className={styles.icon} initial={{ y: 0 }} animate={controls}>
        {icon}
      </motion.span>
      <span className={styles.text}>{label}</span>
    </div>
  );
};

export default TopNavAuthMenuContentItem;

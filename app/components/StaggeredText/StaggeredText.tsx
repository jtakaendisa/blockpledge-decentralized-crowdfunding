'use client';

import { useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import classNames from 'classnames';

import { splitText } from '@/app/utils';

import styles from './StaggeredText.module.scss';

interface Props {
  children: string;
  playAnimation: boolean;
  hidden?: boolean;
}

const transitionProps = (index: number) => ({
  duration: 0.3,
  ease: 'easeInOut',
  delay: 0.045 * index,
});

const StaggeredText = ({ children, playAnimation, hidden }: Props) => {
  const controls = useAnimationControls();
  const controlsDuplicate = useAnimationControls();

  useEffect(() => {
    if (playAnimation) {
      controls.start({ y: '-100%' });
      controlsDuplicate.start({ y: 0 });
    } else {
      controls.start({ y: 0 });
      controlsDuplicate.start({ y: '100%' });
    }
  }, [playAnimation, controls, controlsDuplicate]);

  return (
    <motion.div className={styles.text}>
      <div>
        {splitText(children).map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: 0 }}
            animate={controls}
            transition={transitionProps(index)}
            className={classNames({
              [styles.inlineBlock]: true,
              [styles.hidden]: hidden,
            })}
          >
            {char}
          </motion.span>
        ))}
      </div>
      <div className={styles.duplicateText}>
        {splitText(children).map((char, index) => (
          <motion.span
            key={index}
            initial={{ y: '100%' }}
            animate={controlsDuplicate}
            transition={transitionProps(index)}
            className={styles.inlineBlock}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
};

export default StaggeredText;

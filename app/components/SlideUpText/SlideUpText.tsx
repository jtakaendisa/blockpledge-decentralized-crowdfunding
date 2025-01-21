'use client';

import { ReactNode, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import classNames from 'classnames';

import styles from './SlideUpText.module.scss';

interface Props {
  playAnimation: boolean;
  children: ReactNode;
  hidden?: boolean;
  delay?: number;
  duration?: number;
}

const transitionProps = {
  duration: 0.3,
  ease: 'easeInOut',
};

const SlideUpText = ({ playAnimation, children, hidden, ...otherProps }: Props) => {
  const controls = useAnimationControls();
  const controlsDuplicate = useAnimationControls();

  useEffect(() => {
    if (playAnimation) {
      controls.start({
        y: '-100%',
        transition: { ...transitionProps, ...otherProps },
      });
      controlsDuplicate.start({
        y: 0,
        transition: { ...transitionProps, ...otherProps },
      });
    } else {
      controls.start({
        y: 0,
        transition: { ...transitionProps, ...otherProps },
      });
      controlsDuplicate.start({
        y: '100%',
        transition: { ...transitionProps, ...otherProps },
      });
    }
  }, [playAnimation, controls, controlsDuplicate, otherProps]);

  return (
    <div className={styles.text}>
      <motion.span
        initial={{ y: 0 }}
        animate={controls}
        className={classNames({ [styles.inlineBlock]: true, [styles.hidden]: hidden })}
      >
        {children}
      </motion.span>
      <motion.span
        initial={{ y: '100%' }}
        animate={controlsDuplicate}
        className={classNames(styles.duplicateText, styles.inlineBlock)}
      >
        {children}
      </motion.span>
    </div>
  );
};

export default SlideUpText;

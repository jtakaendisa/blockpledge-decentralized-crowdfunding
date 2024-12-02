import { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

import styles from './StatCard.module.scss';

interface Props {
  stat: {
    metric: string;
    value: number;
  };
  index: number;
}

const riseVariant = {
  initial: { y: 80, opacity: 0 },
  enter: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 2.2 + 0.2 * i },
  }),
};

const StatCard = ({ stat, index }: Props) => {
  const { value, metric } = stat;

  const displayValue = useMotionValue(0);

  useEffect(() => {
    const controls = {
      start: 0,
      end: value,
      duration: 2,
      delay: 2.2 + index * 0.2,
    };

    let startTime: number;

    const animateValue = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = (currentTime - startTime) / 1000 - controls.delay;
      if (elapsed < 0) {
        requestAnimationFrame(animateValue);
        return;
      }

      const progress = Math.min(elapsed / controls.duration, 1);
      const animatedValue = Math.floor(
        progress * (controls.end - controls.start) + controls.start
      );

      displayValue.set(animatedValue);

      if (progress < 1) {
        requestAnimationFrame(animateValue);
      }
    };

    requestAnimationFrame(animateValue);
  }, [value, index, displayValue]);

  return (
    <motion.div
      variants={riseVariant}
      custom={index}
      key={metric}
      className={styles.stat}
    >
      <motion.span className={styles.value}>{displayValue}</motion.span>
      <span className={styles.metric}>{metric}</span>
    </motion.div>
  );
};

export default StatCard;

import { useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';

import styles from './StatCard.module.scss';

interface Props {
  stat: {
    metric: string;
    value: number;
  };
  index: number;
  delay?: number;
}

const StatCard = ({ stat, index, delay = 0 }: Props) => {
  const { value, metric } = stat;

  const displayValue = useMotionValue(0);

  const riseVariant = {
    initial: { y: 80, opacity: 0 },
    enter: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: delay + 0.2 * i },
    }),
  };

  useEffect(() => {
    const controls = {
      start: 0,
      end: value,
      duration: 2,
      delay: delay + index * 0.2,
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
  }, [value, index, delay, displayValue]);

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

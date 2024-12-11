import { motion, useMotionValue } from 'framer-motion';

import useAnimatedNumber from '@/app/hooks/useAnimatedNumber';

import styles from './StatCard.module.scss';

interface Props {
  stat: {
    metric: string;
    value: number;
  };
  index: number;
  delay?: number;
}

const revealVariant = {
  initial: { y: 80, opacity: 0 },
  enter: ({ index, delay }: { index: number; delay: number }) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
      delay: delay + 0.2 * index,
    },
  }),
};

const StatCard = ({ stat, index, delay = 0 }: Props) => {
  const { value, metric } = stat;

  const displayValue = useMotionValue(0);

  useAnimatedNumber(value, index, delay, displayValue);

  return (
    <motion.div
      variants={revealVariant}
      custom={{ index, delay }}
      key={metric}
      className={styles.stat}
    >
      <motion.span className={styles.value}>{displayValue}</motion.span>
      <span className={styles.metric}>{metric}</span>
    </motion.div>
  );
};

export default StatCard;

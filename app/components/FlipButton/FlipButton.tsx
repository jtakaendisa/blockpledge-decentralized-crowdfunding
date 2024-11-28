import { useState } from 'react';
import { motion } from 'framer-motion';

import SlideUpText from '../SlideUpText/SlideUpText';

import styles from './FlipButton.module.scss';

interface Props {
  children: string;
  inverted?: boolean;
  onClick: () => void;
}

const FlipButton = ({ children, inverted, onClick }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHoverState = () => setIsHovered((prev) => !prev);

  const mainbackgroundColor = !inverted
    ? isHovered
      ? '#3c6e71'
      : ' rgba(255, 255, 255, 0.35)'
    : isHovered
    ? 'rgba(255, 255, 255, 0.35)'
    : '#3c6e71';

  const duplicateBackgroundColor = !inverted ? '#3c6e71' : 'rgba(255, 255, 255, .35)';

  const color = !inverted
    ? isHovered
      ? '#fff'
      : '#3c6e71'
    : isHovered
    ? '#3c6e71'
    : '#fff';

  return (
    <motion.div
      onPointerEnter={toggleHoverState}
      onPointerLeave={toggleHoverState}
      initial="initial"
      whileHover="hovered"
      className={styles.button}
      style={{ backgroundColor: mainbackgroundColor }}
    >
      <motion.div
        variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
        }}
        className={styles.duplicate}
        style={{ backgroundColor: duplicateBackgroundColor }}
      />
      <span onClick={onClick} style={{ color }}>
        <SlideUpText playAnimation={isHovered}>{children}</SlideUpText>
      </span>
    </motion.div>
  );
};

export default FlipButton;

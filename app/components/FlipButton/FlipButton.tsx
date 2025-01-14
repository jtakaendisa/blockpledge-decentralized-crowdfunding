import { useState } from 'react';
import { motion, Variants } from 'framer-motion';

import { colors } from '@/app/constants';
import SlideUpText from '../SlideUpText/SlideUpText';

import styles from './FlipButton.module.scss';

interface Props {
  children: string;
  textColor1?: string;
  textColor2?: string;
  backgroundColor1?: string;
  backgroundColor2?: string;
  borderColor?: string;
  scale?: number;
  onClick?: () => void;
}

const hoverVariants: Variants = {
  initial: {
    top: '100%',
  },
  hovered: {
    top: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
};

const { white, darkGreen, lightGray } = colors;

const FlipButton = ({
  children,
  textColor1 = darkGreen,
  textColor2 = white,
  backgroundColor1 = lightGray,
  backgroundColor2 = darkGreen,
  borderColor = darkGreen,
  scale = 1,
  onClick,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonRef = (element: HTMLDivElement) => {
    if (element) {
      element.style.setProperty('--scale', scale.toString());
    }
  };

  const toggleHoverState = () => setIsHovered((prev) => !prev);

  return (
    <motion.div
      ref={buttonRef}
      onPointerEnter={toggleHoverState}
      onPointerLeave={toggleHoverState}
      initial="initial"
      whileHover="hovered"
      className={styles.button}
      style={{ backgroundColor: backgroundColor1, borderColor }}
    >
      {/* Animated Background Sheet*/}
      <motion.div
        variants={hoverVariants}
        className={styles.duplicate}
        style={{ backgroundColor: backgroundColor2 }}
      />

      {/* Main Text */}
      <button
        onClick={onClick}
        className={styles.mainText}
        style={{ color: isHovered ? textColor2 : textColor1 }}
      >
        <SlideUpText playAnimation={isHovered}>{children}</SlideUpText>
      </button>
    </motion.div>
  );
};

export default FlipButton;

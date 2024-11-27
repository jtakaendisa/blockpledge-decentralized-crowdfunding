import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import SlideUpText from '../SlideUpText/SlideUpText';

import styles from './FlipButton.module.scss';

interface Props {
  children: string;
  href: string;
  target?: string;
}

const FlipButton = ({ children, href, target }: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHoverState = () => setIsHovered((prev) => !prev);

  return (
    <motion.div
      onPointerEnter={toggleHoverState}
      onPointerLeave={toggleHoverState}
      initial="initial"
      whileHover="hovered"
      className={styles.button}
      style={{ backgroundColor: isHovered ? '#3c6e71' : '#fff' }}
    >
      <motion.div
        variants={{ initial: { y: '100%' }, hovered: { y: 0 } }}
        transition={{
          duration: 0.2,
          ease: 'easeInOut',
        }}
        className={styles.duplicate}
      />
      <Link
        href={href}
        target={target}
        style={{ color: isHovered ? '#fff' : '#3c6e71' }}
      >
        <SlideUpText playAnimation={isHovered}>{children}</SlideUpText>
      </Link>
    </motion.div>
  );
};

export default FlipButton;

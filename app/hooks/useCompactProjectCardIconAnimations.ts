import { useEffect, useState } from 'react';
import { AnimationControls } from 'framer-motion';

const transitionProps = {
  duration: 0.35,
  ease: 'easeInOut',
};

export const useCompactProjectCardIconAnimations = (controls: AnimationControls) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHoveredState = () => setIsHovered((prev) => !prev);

  useEffect(() => {
    if (isHovered) {
      controls.start({
        y: '-10%',
        opacity: 1,
        transition: transitionProps,
      });
    } else {
      controls.start({
        y: '10%',
        opacity: 0,
        transition: transitionProps,
      });
    }
  }, [isHovered, controls]);

  return { toggleHoveredState };
};

import { useState, useEffect } from 'react';
import { AnimationControls } from 'framer-motion';

const transitionProps = {
  duration: 0.35,
  ease: 'easeInOut',
};

const useTopNavMenuIconAnimations = (controls: AnimationControls) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHoveredState = () => setIsHovered((prev) => !prev);

  useEffect(() => {
    if (isHovered) {
      controls.start({
        y: '-8%',
        transition: transitionProps,
      });
    } else {
      controls.start({
        y: 0,
        transition: transitionProps,
      });
    }
  }, [isHovered, controls]);

  return { toggleHoveredState };
};

export default useTopNavMenuIconAnimations;

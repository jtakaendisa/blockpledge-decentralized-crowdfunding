import { forwardRef, useState } from 'react';

import SlideUpText from '../../SlideUpText/SlideUpText';

import styles from './TopNavMobileMenuButton.module.scss';

interface Props {
  onClick: () => void;
}

const TopNavMobileMenuButton = forwardRef<HTMLDivElement, Props>(({ onClick }, ref) => {
  const [isHovered, setIsHovered] = useState(false);

  const toggleHoveredState = () => setIsHovered((prev) => !prev);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={styles.mobileMenuButton}
      onMouseEnter={toggleHoveredState}
      onMouseLeave={toggleHoveredState}
    >
      <SlideUpText playAnimation={isHovered}>Menu</SlideUpText>
    </div>
  );
});

TopNavMobileMenuButton.displayName = 'TopNavMobileMenuButton';

export default TopNavMobileMenuButton;

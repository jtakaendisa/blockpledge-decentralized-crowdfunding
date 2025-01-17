import { ReactNode } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

import { RoutePath } from '@/app/entities';
import { usePageNavigation } from '@/app/hooks/usePageNavigation';
import { useTopNavMenuIconAnimations } from '@/app/hooks/useTopNavMenuIconAnimations';
import TopRightArrow from '../../icons/TopRightArrow';

import styles from './TopNavMobileMenuLink.module.scss';

interface Props {
  children: ReactNode;
  routePath: RoutePath;
}

const TopNavMobileMenuLink = ({ children, routePath }: Props) => {
  const controls = useAnimationControls();

  const { animatePageOut } = usePageNavigation();
  const { toggleHoveredState } = useTopNavMenuIconAnimations(controls);

  const handleNavigate = () => animatePageOut(routePath);

  return (
    <div
      className={styles.mobileMenuLink}
      onMouseEnter={toggleHoveredState}
      onMouseLeave={toggleHoveredState}
      onClick={handleNavigate}
    >
      <motion.span className={styles.icon} initial={{ y: 0 }} animate={controls}>
        <TopRightArrow size={14} />
      </motion.span>

      <span className={styles.text}>{children}</span>
    </div>
  );
};

export default TopNavMobileMenuLink;

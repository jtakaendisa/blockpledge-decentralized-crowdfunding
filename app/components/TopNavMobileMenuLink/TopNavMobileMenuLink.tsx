import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import { motion, useAnimationControls } from 'framer-motion';

import { RoutePath } from '@/app/entities';
import TopRightArrow from '../icons/TopRightArrow';

import styles from './TopNavMobileMenuLink.module.scss';
import useTopNavMenuIconAnimations from '@/app/hooks/useTopNavMenuIconAnimations';

interface Props {
  children: ReactNode;
  routePath: RoutePath;
  isUnderlined: boolean;
  onNavigate: (routePath: RoutePath) => void;
}

const TopNavMobileMenuLink = ({
  children,
  routePath,
  isUnderlined,
  onNavigate,
}: Props) => {
  const controls = useAnimationControls();

  const { toggleHoveredState } = useTopNavMenuIconAnimations(controls);

  const handleNavigate = () => onNavigate(routePath);

  return (
    <div
      className={classNames({
        [styles.mobileMenuLink]: true,
        [styles.underline]: isUnderlined,
      })}
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

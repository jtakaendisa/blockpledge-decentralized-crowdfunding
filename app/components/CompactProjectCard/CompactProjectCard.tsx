import Link from 'next/link';
import { motion, useAnimationControls } from 'framer-motion';

import { Project } from '@/app/entities';
import { colors } from '@/app/constants';
import { truncateText } from '@/app/utils';
import { useCompactProjectCardIconAnimations } from '@/app/hooks/useCompactProjectCardIconAnimations';
import ProjectImage from '../ProjectImage/ProjectImage';
import ProjectTitle from '../ProjectTitle/ProjectTitle';
import ProjectText from '../ProjectText/ProjectText';
import ProjectCategory from '../ProjectCategory/ProjectCategory';
import ProjectOwnerInfo from '../ProjectOwnerInfo/ProjectOwnerInfo';
import SpaceBetweenRow from '../SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../VerticalSpacer/VerticalSpacer';
import TopRightArrow from '../icons/TopRightArrow';
import defaultBlurDataURL from '@/public/images/defaultBlurDataURL.png';

import styles from './CompactProjectCard.module.scss';

interface Props {
  project: Project;
}

const revealVariants = {
  initial: {
    opacity: 0.5,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const IMAGE_SIZE = 100;

const { baseGray, darkGreen } = colors;

const CompactProjectCard = ({ project }: Props) => {
  const { id, title, categoryId, owner, description, imageURLs } = project;

  const controls = useAnimationControls();

  const { toggleHoveredState } = useCompactProjectCardIconAnimations(controls);

  const imageContainerRef = (element: HTMLDivElement) => {
    if (element) {
      element.style.setProperty('--image-size', `${IMAGE_SIZE}px`);
    }
  };

  return (
    <motion.div
      onMouseEnter={toggleHoveredState}
      onMouseLeave={toggleHoveredState}
      className={styles.compactProjectCard}
      initial="initial"
      animate="animate"
      variants={revealVariants}
    >
      <Link href={`/projects/${id}`} className={styles.link}>
        <div ref={imageContainerRef} className={styles.imageContainer}>
          <ProjectImage
            imageURLs={imageURLs}
            title={title}
            height={IMAGE_SIZE}
            blurDataURL={defaultBlurDataURL.blurDataURL}
            sizes="120px"
          />
        </div>

        <div className={styles.content}>
          <SpaceBetweenRow>
            <ProjectTitle>{truncateText(title, 38, true)}</ProjectTitle>
            <ProjectText color={baseGray}>ID: {id}</ProjectText>
          </SpaceBetweenRow>

          <ProjectCategory categoryId={categoryId} />
          <VerticalSpacer height={2} />

          <ProjectOwnerInfo owner={owner} />
          <VerticalSpacer height={8} />

          <SpaceBetweenRow>
            <ProjectText>{truncateText(description, 40, true)}</ProjectText>
            <motion.span
              className={styles.icon}
              initial={{ y: '10%', opacity: 0 }}
              animate={controls}
            >
              <TopRightArrow fill={darkGreen} size={12} />
            </motion.span>
          </SpaceBetweenRow>
        </div>
      </Link>
    </motion.div>
  );
};

export default CompactProjectCard;

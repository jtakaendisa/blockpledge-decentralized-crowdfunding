import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

import { Project } from '@/app/store';
import ProjectImage from '../ProjectImage/ProjectImage';
import ProjectOwnerInfo from '../ProjectOwnerInfo/ProjectOwnerInfo';
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import ProjectProgressBar from '../ProjectProgressBar/ProjectProgressBar';
import ProjectTitle from '../ProjectTitle/ProjectTitle';
import ProjectRemainingTime from '../ProjectRemainingTime/ProjectRemainingTime';
import ProjectText from '../ProjectText/ProjectText';
import SpaceBetweenRow from '../SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '../VerticalSpacer/VerticalSpacer';

import styles from './ProjectCard.module.scss';

interface Props {
  project: Project;
  blurDataURL?: string;
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

const ProjectCard = ({ project, blurDataURL }: Props) => {
  const { id, owner, title, imageURLs, backers, expiresAt, raised, cost, status } =
    project;

  const [isHovered, setIsHovered] = useState(false);

  const toggleHoveredState = () => setIsHovered((prev) => !prev);

  return (
    <motion.div
      onMouseEnter={toggleHoveredState}
      onMouseLeave={toggleHoveredState}
      className={styles.card}
      initial="initial"
      animate="animate"
      variants={revealVariants}
    >
      <Link href={`/projects/${id}`} className={styles.link}>
        <ProjectImage
          imageURLs={imageURLs}
          blurDataURL={blurDataURL}
          title={title}
          isHovered={isHovered}
        />

        <div className={styles.contentContainer}>
          <ProjectTitle>{title}</ProjectTitle>
          <VerticalSpacer height={11} />

          <ProjectOwnerInfo owner={owner} />
          <VerticalSpacer height={11} />

          <ProjectRemainingTime>{expiresAt}</ProjectRemainingTime>
          <VerticalSpacer height={5} />

          <ProjectProgressBar raised={raised} cost={cost} />
          <VerticalSpacer height={5} />

          <SpaceBetweenRow>
            <ProjectText>{raised} ETH Raised</ProjectText>
            <ProjectText icon="ethereum">{cost} ETH</ProjectText>
          </SpaceBetweenRow>
          <VerticalSpacer />

          <SpaceBetweenRow>
            <ProjectText>
              {backers} {backers === 1 ? 'Backer' : 'Backers'}
            </ProjectText>
            <ProjectStatus status={status} />
          </SpaceBetweenRow>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;

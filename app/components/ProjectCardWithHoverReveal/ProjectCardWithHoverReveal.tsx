import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import classNames from 'classnames';

import { Project } from '@/app/store';
import { truncateText } from '@/app/utils';
import ProjectImage from '../ProjectImage/ProjectImage';
import ProjectTitle from '../ProjectTitle/ProjectTitle';
import ProjectOwnerInfo from '../ProjectOwnerInfo/ProjectOwnerInfo';
import ProjectProgressBar from '../ProjectProgressBar/ProjectProgressBar';
import SpaceBetweenRow from '../SpaceBetweenRow/SpaceBetweenRow';
import ProjectRevealContent from '../ProjectRevealContent/ProjectRevealContent';
import ProjectCategory from '../ProjectCategory/ProjectCategory';
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import ProjectText from '../ProjectText/ProjectText';
import ProjectBadge from '../ProjectBadge/ProjectBadge';
import VerticalSpacer from '../VerticalSpacer/VerticalSpacer';

import styles from './ProjectCardWithHoverReveal.module.scss';

interface Props {
  project: Project;
}

const revealVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.85,
    },
  },
};

const ProjectCardWithHoverReveal = ({ project }: Props) => {
  const {
    id,
    owner,
    title,
    categoryId,
    imageURLs,
    description,
    backers,
    raised,
    cost,
    status,
  } = project;

  const [isHovered, setIsHovered] = useState(false);

  const toggleHoveredState = () => setIsHovered((prev) => !prev);

  console.log(title.slice(0, 6) + ' ...');

  return (
    <motion.div
      onMouseEnter={toggleHoveredState}
      onMouseLeave={toggleHoveredState}
      className={classNames({ [styles.card]: true, [styles.hovered]: isHovered })}
      initial="initial"
      animate="animate"
      variants={revealVariants}
    >
      <Link href={`/projects/${id}`} className={styles.link}>
        <ProjectImage
          imageURLs={imageURLs}
          title={title}
          height={176}
          sizes="22vw"
          borderTopLeftRadius={16}
          borderTopRightRadius={16}
        />

        <ProjectProgressBar raised={raised} cost={cost} height={10} flatEdge />
        <VerticalSpacer height={3} />

        <div className={styles.contentContainer}>
          <SpaceBetweenRow>
            <ProjectText>{raised} ETH Raised</ProjectText>
            <ProjectText icon="ethereum">{cost} ETH</ProjectText>
          </SpaceBetweenRow>
          <VerticalSpacer height={12} />

          <ProjectTitle>{truncateText(title, 29, true)}</ProjectTitle>
          <VerticalSpacer height={8} />

          <ProjectOwnerInfo owner={owner} />
          <VerticalSpacer height={8} />

          <ProjectBadge top={8} right={8}>
            <ProjectCategory categoryId={categoryId} color="white" fontWeight={500} />
          </ProjectBadge>
        </div>

        <ProjectRevealContent isHovered={isHovered}>
          <VerticalSpacer height={8} />
          <ProjectText>{description}</ProjectText>
          <VerticalSpacer />

          <SpaceBetweenRow>
            <ProjectText>
              {backers} {backers === 1 ? 'Backer' : 'Backers'}
            </ProjectText>
            <ProjectStatus status={status} />
          </SpaceBetweenRow>
          <VerticalSpacer />
        </ProjectRevealContent>
      </Link>
    </motion.div>
  );
};

export default ProjectCardWithHoverReveal;

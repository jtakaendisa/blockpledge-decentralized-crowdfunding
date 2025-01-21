'use client';

import { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { motion } from 'framer-motion';

import { Project } from '@/app/entities';
import { colors } from '@/app/constants';
import { truncateText } from '@/app/utils';
import ProjectImage from '@/app/components/ProjectImage/ProjectImage';
import ProjectTitle from '@/app/components/ProjectTitle/ProjectTitle';
import ProjectOwnerInfo from '@/app/components/ProjectOwnerInfo/ProjectOwnerInfo';
import ProjectProgressBar from '@/app/components/ProjectProgressBar/ProjectProgressBar';
import SpaceBetweenRow from '@/app/components/SpaceBetweenRow/SpaceBetweenRow';
import ProjectRevealContent from '@/app/components/ProjectRevealContent/ProjectRevealContent';
import ProjectCategory from '@/app/components/ProjectCategory/ProjectCategory';
import ProjectStatus from '@/app/components/ProjectStatus/ProjectStatus';
import ProjectText from '@/app/components/ProjectText/ProjectText';
import ProjectBadge from '@/app/components/ProjectBadge/ProjectBadge';
import VerticalSpacer from '@/app/components/VerticalSpacer/VerticalSpacer';
import Ethereum from '@/app/components/icons/Ethereum';

import styles from './ProjectCardWithHoverReveal.module.scss';

interface Props {
  project: Project & { blurDataURL: string };
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

const { white, baseGray } = colors;

const ProjectCardWithHoverReveal = ({ project }: Props) => {
  const {
    id,
    owner,
    title,
    categoryId,
    imageUrls,
    description,
    backers,
    raised,
    cost,
    status,
    blurDataURL,
  } = project;

  const [isHovered, setIsHovered] = useState(false);

  const toggleHoveredState = () => setIsHovered((prev) => !prev);

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
          imageUrls={imageUrls}
          title={title}
          height={176}
          sizes="22vw"
          blurDataURL={blurDataURL}
          borderTopLeftRadius={16}
          borderTopRightRadius={16}
        />

        <ProjectProgressBar raised={raised} cost={cost} height={10} flatEdge />
        <VerticalSpacer height={3} />

        <div className={styles.contentContainer}>
          <SpaceBetweenRow>
            <ProjectText>{raised} ETH Raised</ProjectText>
            <ProjectText icon={<Ethereum fill={baseGray} size={18} />}>
              {cost} ETH
            </ProjectText>
          </SpaceBetweenRow>
          <VerticalSpacer height={12} />

          <ProjectTitle>{truncateText(title, 29, true)}</ProjectTitle>
          <VerticalSpacer height={8} />

          <ProjectOwnerInfo owner={owner} />
          <VerticalSpacer height={8} />

          <ProjectBadge top={8} right={8}>
            <ProjectCategory categoryId={categoryId} color={white} fontWeight={500} />
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

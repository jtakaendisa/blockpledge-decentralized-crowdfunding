import Link from 'next/link';

import { Project } from '@/app/store';
import { findDaysRemaining } from '@/app/utils';
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
import { useState } from 'react';

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const { id, owner, title, imageURLs, backers, expiresAt, raised, cost, status } =
    project;

  const [isHovered, setIsHovered] = useState(false);

  const toggleHoveredState = () => setIsHovered((prev) => !prev);

  return (
    <div
      onMouseEnter={toggleHoveredState}
      onMouseLeave={toggleHoveredState}
      className={styles.card}
    >
      <Link href={`/projects/${id}`} className={styles.link}>
        <ProjectImage imageURLs={imageURLs} title={title} isHovered={isHovered} />

        <div className={styles.contentContainer}>
          <ProjectTitle>{title}</ProjectTitle>
          <VerticalSpacer height={0.7} />
          <ProjectOwnerInfo owner={owner} />
          <VerticalSpacer height={0.7} />
          <ProjectRemainingTime>{findDaysRemaining(expiresAt)}</ProjectRemainingTime>
          <VerticalSpacer height={0.2} />
          <ProjectProgressBar raised={raised} cost={cost} />
          <VerticalSpacer height={0.2} />
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
    </div>
  );
};

export default ProjectCard;

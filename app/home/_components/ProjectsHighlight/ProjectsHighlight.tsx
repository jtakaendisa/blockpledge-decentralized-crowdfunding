'use client';

import { useRef } from 'react';

import { Project } from '@/app/entities';
import { colors } from '@/app/constants';
import { truncateText } from '@/app/utils';
import { useProjectsHighlight } from '../../_hooks/useProjectsHighlight';
import { usePageNavigation } from '@/app/hooks/usePageNavigation';
import ProjectImage from '@/app/components/ProjectImage/ProjectImage';
import ProjectProgressBar from '@/app/components/ProjectProgressBar/ProjectProgressBar';
import ProjectTitle from '@/app/components/ProjectTitle/ProjectTitle';
import ProjectOwnerInfo from '@/app/components/ProjectOwnerInfo/ProjectOwnerInfo';
import ProjectText from '@/app/components/ProjectText/ProjectText';
import ProjectCategory from '@/app/components/ProjectCategory/ProjectCategory';
import ProjectStatus from '@/app/components/ProjectStatus/ProjectStatus';
import ProjectRemainingTime from '@/app/components/ProjectRemainingTime/ProjectRemainingTime';
import SpaceBetweenRow from '@/app/components/SpaceBetweenRow/SpaceBetweenRow';
import VerticalSpacer from '@/app/components/VerticalSpacer/VerticalSpacer';
import FlipButton from '@/app/components/FlipButton/FlipButton';
import Ethereum from '@/app/components/icons/Ethereum';

import styles from './ProjectsHighlight.module.scss';

interface Props {
  project: Project;
  blurDataURL: string;
}

const { baseGray } = colors;

const ProjectsHighlight = ({ project, blurDataURL }: Props) => {
  const {
    id,
    owner,
    title,
    categoryId,
    imageUrls,
    description,
    expiresAt,
    raised,
    cost,
    status,
  } = project;

  const cardRef = useRef<HTMLDivElement | null>(null);

  const { projectImageHeight } = useProjectsHighlight(cardRef);
  const { navigateToPage } = usePageNavigation();

  const handleClick = () => {
    navigateToPage(`/projects/${id}`);
  };

  return (
    <div ref={cardRef} className={styles.highlight}>
      <ProjectImage
        imageUrls={imageUrls}
        title={title}
        height={projectImageHeight}
        sizes="30vw"
        blurDataURL={blurDataURL}
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
      />
      <ProjectProgressBar cost={cost} raised={raised} height={10} flatEdge />
      <VerticalSpacer height={6} />

      <div className={styles.contentContainer}>
        <SpaceBetweenRow>
          <ProjectText>{raised} ETH Raised</ProjectText>
          <ProjectText icon={<Ethereum fill={baseGray} size={18} />}>
            {cost}
          </ProjectText>
        </SpaceBetweenRow>
        <VerticalSpacer />
        <ProjectTitle fontSize={20}>{truncateText(title, 50, true)}</ProjectTitle>
        <VerticalSpacer height={6} />

        <ProjectCategory categoryId={categoryId} fontSize={16} fontWeight={500} />
        <VerticalSpacer />

        <SpaceBetweenRow>
          <ProjectOwnerInfo
            owner={owner}
            iconSize={20}
            fontSize={16}
            fontWeight={500}
          />
          <ProjectStatus status={status} fontSize={16} fontWeight={500} />
        </SpaceBetweenRow>
        <VerticalSpacer height={6} />

        <ProjectRemainingTime fontSize={16}>{expiresAt}</ProjectRemainingTime>
        <VerticalSpacer height={24} />

        <ProjectText fontSize={16}>{description}</ProjectText>
        <VerticalSpacer height={24} />

        <div className={styles.buttonContainer}>
          <FlipButton onClick={handleClick}>View Project</FlipButton>
        </div>
      </div>
    </div>
  );
};

export default ProjectsHighlight;

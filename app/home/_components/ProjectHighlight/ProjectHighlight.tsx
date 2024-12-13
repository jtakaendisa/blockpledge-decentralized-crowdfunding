import { useRef } from 'react';

import { Project } from '@/app/store';
import useProjectHighlight from '../../hooks/useProjectHighlight';
import usePageNavigation from '@/app/hooks/usePageNavigation';
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

import styles from './ProjectHighlight.module.scss';

interface Props {
  project: Project;
}

const ProjectHighlight = ({ project }: Props) => {
  const {
    id,
    owner,
    title,
    categoryId,
    imageURLs,
    description,
    expiresAt,
    raised,
    cost,
    status,
  } = project;

  const cardRef = useRef<HTMLDivElement | null>(null);

  const { projectImageHeight } = useProjectHighlight(cardRef);
  const { animatePageOut } = usePageNavigation();

  return (
    <div ref={cardRef} className={styles.highlight}>
      <ProjectImage
        imageURLs={imageURLs}
        title={title}
        height={projectImageHeight}
        sizes="40vw"
        borderTopLeftRadius={16}
        borderTopRightRadius={16}
      />

      <ProjectProgressBar cost={cost} raised={raised} height={10} flatEdge />
      <VerticalSpacer height={6} />

      <div className={styles.contentContainer}>
        <SpaceBetweenRow>
          <ProjectText>{raised} ETH Raised</ProjectText>
          <ProjectText icon="ethereum">{cost}</ProjectText>
        </SpaceBetweenRow>
        <VerticalSpacer />

        <ProjectTitle fontSize={26}>{title}</ProjectTitle>
        <VerticalSpacer height={6} />

        <ProjectCategory categoryId={categoryId} fontSize={18} fontWeight={500} />
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
        <VerticalSpacer height={32} />

        <ProjectText fontSize={16}>{description}</ProjectText>
        <VerticalSpacer height={32} />

        <div className={styles.buttonContainer}>
          <FlipButton onClick={() => animatePageOut(`/projects/${id}`)}>
            View Project
          </FlipButton>
        </div>
      </div>
    </div>
  );
};

export default ProjectHighlight;

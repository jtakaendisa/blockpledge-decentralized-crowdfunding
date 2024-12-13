import { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

import { Project } from '@/app/store';
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

  return (
    <div
      onMouseEnter={toggleHoveredState}
      onMouseLeave={toggleHoveredState}
      className={classNames({ [styles.card]: true, [styles.hovered]: isHovered })}
    >
      <Link href={`/projects/${id}`} className={styles.link}>
        <ProjectImage
          imageURLs={imageURLs}
          title={title}
          height={14}
          borderTopLeftRadius={16}
          borderTopRightRadius={16}
        />

        <ProjectProgressBar raised={raised} cost={cost} height={0.65} flatEdge />
        <VerticalSpacer height={0.2} />

        <div className={styles.contentContainer}>
          <SpaceBetweenRow>
            <ProjectText>{raised} ETH Raised</ProjectText>
            <ProjectText icon="ethereum">{cost} ETH</ProjectText>
          </SpaceBetweenRow>
          <VerticalSpacer height={0.75} />

          <ProjectTitle>{title}</ProjectTitle>
          <VerticalSpacer height={0.5} />

          <ProjectOwnerInfo owner={owner} />
          <VerticalSpacer height={0.5} />

          <ProjectBadge top={8} right={8}>
            <ProjectCategory categoryId={categoryId} color="white" fontWeight="500" />
          </ProjectBadge>
        </div>

        <ProjectRevealContent isHovered={isHovered}>
          <VerticalSpacer height={0.5} />
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
    </div>
  );
};

export default ProjectCardWithHoverReveal;

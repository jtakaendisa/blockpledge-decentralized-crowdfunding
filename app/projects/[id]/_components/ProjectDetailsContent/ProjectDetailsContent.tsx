import { colors } from '@/app/constants';
import { Project } from '@/app/store';
import useProjectModals from '@/app/hooks/useProjectModals';
import ProjectTitle from '@/app/components/ProjectTitle/ProjectTitle';
import ProjectFollowButton from '@/app/components/ProjectFollowButton/ProjectFollowButton';
import ProjectCategory from '@/app/components/ProjectCategory/ProjectCategory';
import SpaceBetweenRow from '@/app/components/SpaceBetweenRow/SpaceBetweenRow';
import ProjectOwnerInfo from '@/app/components/ProjectOwnerInfo/ProjectOwnerInfo';
import ProjectStatus from '@/app/components/ProjectStatus/ProjectStatus';
import ProjectText from '@/app/components/ProjectText/ProjectText';
import ProjectMetrics from '../ProjectMetrics/ProjectMetrics';
import ProjectPayoutPolicy from '@/app/components/ProjectPayoutPolicy/ProjectPayoutPolicy';
import ProjectProgressBar from '@/app/components/ProjectProgressBar/ProjectProgressBar';
import ProjectButtons from '@/app/components/ProjectButtons/ProjectButtons';
import ProjectSocials from '@/app/components/ProjectSocials/ProjectSocials';
import ProjectDetailsContentModals from '../ProjectDetailsContentModals/ProjectDetailsContentModals';
import VerticalSpacer from '@/app/components/VerticalSpacer/VerticalSpacer';

import styles from './ProjectDetailsContent.module.scss';

interface Props {
  project: Project;
}

const { darkGreen } = colors;

const ProjectDetailsContent = ({ project }: Props) => {
  const {
    id,
    title,
    categoryId,
    owner,
    status,
    description,
    backers,
    expiresAt,
    raised,
    cost,
  } = project;

  const {
    isAuthorizeProjectModalOpen,
    isBackProjectModalOpen,
    isEditProjectModalOpen,
    isDeleteProjectModalOpen,
    toggleAuthorizeProjectModalState,
    toggleBackProjectModalState,
    toggleEditProjectState,
    toggleDeleteProjectState,
  } = useProjectModals();

  return (
    <div className={styles.content}>
      <div className={styles.topRow}>
        <ProjectTitle fontSize={24} fontWeight={700} color={darkGreen}>
          {title}
        </ProjectTitle>
        <ProjectFollowButton projectId={id} />
      </div>
      <VerticalSpacer />

      <ProjectCategory categoryId={categoryId} fontSize={16} fontWeight={600} />
      <VerticalSpacer />

      <SpaceBetweenRow>
        <ProjectOwnerInfo owner={owner} iconSize={20} fontSize={16} fontWeight={600} />
        <ProjectStatus status={status} fontSize={16} fontWeight={600} />
      </SpaceBetweenRow>
      <VerticalSpacer height={32} />

      <ProjectText fontSize={16}>{description}</ProjectText>
      <VerticalSpacer height={32} />

      <SpaceBetweenRow>
        <ProjectMetrics backers={backers} expiresAt={expiresAt} />
        <ProjectPayoutPolicy />
      </SpaceBetweenRow>
      <VerticalSpacer height={24} />

      <ProjectProgressBar raised={raised} cost={cost} />
      <VerticalSpacer height={12} />

      <SpaceBetweenRow>
        <ProjectText fontSize={16} fontWeight={500}>
          {raised} ETH Raised
        </ProjectText>
        <ProjectText icon="ethereum" fontSize={16} fontWeight={500}>
          {cost} ETH
        </ProjectText>
      </SpaceBetweenRow>
      <VerticalSpacer height={48} />

      <SpaceBetweenRow>
        <ProjectButtons
          projectStatus={status}
          projectOwner={owner}
          onAuthorizeProject={toggleAuthorizeProjectModalState}
          onBackProject={toggleBackProjectModalState}
          onEditProject={toggleEditProjectState}
          onDeleteProject={toggleDeleteProjectState}
        />
        <ProjectSocials />
      </SpaceBetweenRow>

      <ProjectDetailsContentModals
        project={project}
        isAuthorizeProjectModalOpen={isAuthorizeProjectModalOpen}
        isBackProjectModalOpen={isBackProjectModalOpen}
        isEditProjectModalOpen={isEditProjectModalOpen}
        isDeleteProjectModalOpen={isDeleteProjectModalOpen}
        onAuthorizeProject={toggleAuthorizeProjectModalState}
        onBackProject={toggleBackProjectModalState}
        onEditProject={toggleEditProjectState}
        onDeleteProject={toggleDeleteProjectState}
      />
    </div>
  );
};

export default ProjectDetailsContent;

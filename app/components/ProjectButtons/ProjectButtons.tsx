import { colors } from '@/app/constants';
import { useGlobalStateContext } from '@/app/hooks/useGlobalStateContext';
import FlipButton from '../FlipButton/FlipButton';

import styles from './ProjectButtons.module.scss';

const { darkGray, darkGreen, orange, red } = colors;

interface Props {
  projectStatus: number;
  projectOwner: string;
  onAuthorizeProject: () => void;
  onBackProject: () => void;
  onEditProject: () => void;
  onDeleteProject: () => void;
}

const ProjectButtons = ({
  projectStatus,
  projectOwner,
  onAuthorizeProject,
  onBackProject,
  onEditProject,
  onDeleteProject,
}: Props) => {
  const { authUser, connectedAccount } = useGlobalStateContext();

  const isAdmin = authUser?.uid === process.env.NEXT_PUBLIC_ADMIN_UID;
  const isOwner = connectedAccount === projectOwner;
  const isOpen = projectStatus === 0;
  const isPendingApproval = projectStatus === 5;

  const buttons = [
    {
      label: 'Accept/Reject',
      onClick: onAuthorizeProject,
      colors: { textColor1: orange, backgroundColor2: orange, borderColor: orange },
      isEnabled: isPendingApproval && isAdmin,
    },
    {
      label: 'Back Project',
      onClick: onBackProject,
      colors: {
        textColor1: darkGreen,
        backgroundColor2: darkGreen,
        borderColor: darkGreen,
      },
      isEnabled: isOpen && authUser && !isAdmin && !isOwner,
    },
    {
      label: 'Edit',
      onClick: onEditProject,
      colors: {
        textColor1: darkGray,
        backgroundColor2: darkGray,
        borderColor: darkGray,
      },
      isEnabled: isOpen && isOwner,
    },
    {
      label: 'Delete',
      onClick: onDeleteProject,
      colors: { textColor1: red, backgroundColor2: red, borderColor: red },
      isEnabled: isOpen && isOwner,
    },
  ];

  return (
    <div className={styles.buttons}>
      {buttons.map(({ label, onClick, colors, isEnabled }) => {
        if (!isEnabled) return null;

        return (
          <FlipButton
            key={label}
            onClick={onClick}
            scale={0.8}
            textColor1={colors.textColor1}
            backgroundColor2={colors.backgroundColor2}
            borderColor={colors.borderColor}
          >
            {label}
          </FlipButton>
        );
      })}
    </div>
  );
};

export default ProjectButtons;

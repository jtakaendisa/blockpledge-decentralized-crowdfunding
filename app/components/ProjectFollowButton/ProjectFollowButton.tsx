import classNames from 'classnames';

import { colors } from '@/app/constants';
import { AuthUser } from '@/app/store';
import useProjectFollowButton from '@/app/hooks/useProjectFollowButton';
import Follow from '../icons/Follow';
import Following from '../icons/Following';

import styles from './ProjectFollowButton.module.scss';

interface Props {
  projectId: number;
}

const ICON_SZIE = 22;

const { darkGreen, orange } = colors;

const generateTooltipText = (authUser: AuthUser | null, isFollowing?: boolean) => {
  if (!authUser) return 'sign in to follow';
  return isFollowing ? 'unfollow project' : 'follow project';
};

const ProjectFollowButton = ({ projectId }: Props) => {
  const {
    authUser,
    isHovered,
    isFollowing,
    isDisabled,
    toggleHoveredState,
    handleProjectFollow,
  } = useProjectFollowButton(projectId);

  const fill = isFollowing ? darkGreen : orange;

  return (
    <button
      onClick={() => !isDisabled && handleProjectFollow()}
      className={classNames(styles.followButton, styles.tooltipButton)}
      style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
      onMouseEnter={toggleHoveredState}
      onMouseLeave={toggleHoveredState}
    >
      {isFollowing ? (
        <Following fill={fill} size={ICON_SZIE} />
      ) : (
        <Follow fill={fill} size={ICON_SZIE} />
      )}

      <span
        className={classNames({
          [styles.tooltip]: true,
          [styles.show]: isHovered,
        })}
      >
        {generateTooltipText(authUser, isFollowing)}
      </span>
    </button>
  );
};

export default ProjectFollowButton;

import { useState } from 'react';

import { useAccountStore } from '../store';
import { followProject } from '../services/authService';

const useProjectFollowButton = (projectId: number) => {
  const authUser = useAccountStore((s) => s.authUser);
  const setUpdatingAuthUserData = useAccountStore((s) => s.setUpdatingAuthUserData);

  const [isHovered, setIsHovered] = useState(false);
  const [isUpdatingFollowStatus, setIsUpdatingFollowStatus] = useState(false);

  const isFollowing = authUser?.following.includes(projectId);

  const isDisabled = isUpdatingFollowStatus || !authUser;

  const toggleHoveredState = () => setIsHovered((prev) => !prev);

  const handleProjectFollow = async () => {
    if (!authUser) return;

    setIsUpdatingFollowStatus(true);

    try {
      await followProject(authUser, projectId, isFollowing);
      setUpdatingAuthUserData();
    } catch (error) {
      console.log('Failed to update follow status', (error as Error).message);
    } finally {
      setIsUpdatingFollowStatus(false);
    }
  };

  return {
    authUser,
    isHovered,
    isFollowing,
    isDisabled,
    toggleHoveredState,
    handleProjectFollow,
  };
};

export default useProjectFollowButton;

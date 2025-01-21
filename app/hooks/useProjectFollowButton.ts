import { useState } from 'react';

import { useGlobalStateContext } from './useGlobalStateContext';
import { followProject } from '../services/authService';

export const useProjectFollowButton = (projectId: number) => {
  const { authUser } = useGlobalStateContext();

  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isFollowing = authUser?.following.includes(projectId);

  const isDisabled = isLoading || !authUser;

  const handleProjectFollow = async () => {
    if (!authUser) return;

    setIsLoading(true);

    try {
      await followProject(authUser, projectId, isFollowing);
    } catch (error) {
      console.log('Failed to update follow status', (error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleHoveredState = () => setIsHovered((prev) => !prev);

  return {
    authUser,
    isHovered,
    isFollowing,
    isDisabled,
    handleProjectFollow,
    toggleHoveredState,
  };
};

import { useContext } from 'react';

import { FeaturedProjectsContext } from '../contexts/FeaturedProjectsContext';

export const useFeaturedProjectsContext = () => {
  const context = useContext(FeaturedProjectsContext);

  if (!context) {
    throw new Error(
      'useFeaturedProjectsContext must be used within a FeaturedProjectsProvider'
    );
  }

  return context;
};

import { useContext } from 'react';

import { ProjectPageContext } from '../contexts/ProjectPageContext';

export const useProjectPageContext = () => {
  const context = useContext(ProjectPageContext);

  if (!context) {
    throw new Error('useProjectPageContext must be used within a ProjectPageProvider');
  }

  return context;
};

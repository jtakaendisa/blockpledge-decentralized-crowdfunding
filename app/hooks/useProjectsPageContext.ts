import { useContext } from 'react';

import { ProjectsPageContext } from '../contexts/ProjectsPageContext';

export const useProjectsPageContext = () => {
  const context = useContext(ProjectsPageContext);

  if (!context) {
    throw new Error(
      'useProjectsPageContext must be used within a ProjectsPageProvider'
    );
  }

  return context;
};

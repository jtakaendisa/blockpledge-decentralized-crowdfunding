import { createContext, PropsWithChildren, useCallback, useState } from 'react';

import { Backer, Project } from '../entities';

interface ProjectPageContextType {
  project: Project;
  backers: Backer[];
  blurDataUrls: string[];
  updateProject: (project: Project) => void;
  updateBackers: (backers: Backer[]) => void;
  updateBlurDataUrls: (blurDataUrls: string[]) => void;
}

export const ProjectPageContext = createContext<ProjectPageContextType>({
  project: {} as Project,
  backers: [],
  blurDataUrls: [],
  updateProject: () => {},
  updateBackers: () => {},
  updateBlurDataUrls: () => {},
});

export const ProjectPageProvider = ({ children }: PropsWithChildren) => {
  const [project, setProject] = useState<Project>({} as Project);
  const [backers, setBackers] = useState<Backer[]>([]);
  const [blurDataUrls, setBlurDataUrls] = useState<string[]>([]);

  const updateProject = useCallback((project: Project) => {
    setProject(project);
  }, []);

  const updateBackers = useCallback((backers: Backer[]) => {
    setBackers(backers);
  }, []);

  const updateBlurDataUrls = useCallback((blurDataUrls: string[]) => {
    setBlurDataUrls(blurDataUrls);
  }, []);

  return (
    <ProjectPageContext.Provider
      value={{
        project,
        backers,
        blurDataUrls,
        updateProject,
        updateBackers,
        updateBlurDataUrls,
      }}
    >
      {children}
    </ProjectPageContext.Provider>
  );
};

import { createContext, PropsWithChildren, useCallback, useState } from 'react';

type SelectedCategoryId = number | null;

interface ProjectsPageContextType {
  searchQuery: string;
  selectedCategoryId: SelectedCategoryId;
  updateSearchQuery: (searchQuery: string) => void;
  updateSelectedCategoryId: (selectedCategoryId: SelectedCategoryId) => void;
}

export const ProjectsPageContext = createContext<ProjectsPageContextType>({
  searchQuery: '',
  selectedCategoryId: null,
  updateSearchQuery: () => {},
  updateSelectedCategoryId: () => {},
});

export const ProjectsPageProvider = ({ children }: PropsWithChildren) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] =
    useState<SelectedCategoryId>(null);

  const updateSearchQuery = useCallback((searchQuery: string) => {
    setSearchQuery(searchQuery);
  }, []);

  const updateSelectedCategoryId = useCallback(
    (selectedCategoryId: SelectedCategoryId) => {
      setSelectedCategoryId(selectedCategoryId);
    },
    []
  );

  return (
    <ProjectsPageContext.Provider
      value={{
        searchQuery,
        selectedCategoryId,
        updateSearchQuery,
        updateSelectedCategoryId,
      }}
    >
      {children}
    </ProjectsPageContext.Provider>
  );
};

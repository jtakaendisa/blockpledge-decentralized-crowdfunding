import createFastContext from './createFastContext';

export const {
  FastContextProvider: ProjectsPageProvider,
  useFastContextFields: useProjectsPageState,
} = createFastContext<{
  searchQuery: string;
  selectedCategoryId: number | null;
}>({
  searchQuery: '',
  selectedCategoryId: null,
});

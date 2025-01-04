import { Backer, Project } from '../entities';
import createFastContext from './createFastContext';

export const {
  FastContextProvider: ProjectPageProvider,
  useFastContextFields: useProjectPageState,
} = createFastContext<{
  project: Project;
  backers: Backer[];
  blurDataURLs: string[];
}>({
  project: {} as Project,
  backers: [],
  blurDataURLs: [],
});

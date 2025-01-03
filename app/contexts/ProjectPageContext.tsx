import { Backer, Project } from '../entities';
import createFastContext from './createFastContext';

export const {
  FastContextProvider: ProjectPageProvider,
  useFastContextFields: useProjectPageState,
} = createFastContext<{
  project: Project | null;
  backers: Backer[] | null;
  blurDataURLs: string[] | null;
}>({
  project: null,
  backers: null,
  blurDataURLs: null,
});

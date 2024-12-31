import createFastContext from './createFastContext';

export const {
  FastContextProvider: FeaturedProjectsProvider,
  useFastContextFields: useFeaturedProjectsState,
} = createFastContext<{
  blurDataURLs: string[];
}>({
  blurDataURLs: [],
});

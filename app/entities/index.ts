import { pathnameMap } from '../constants';

export type RoutePath = keyof typeof pathnameMap | `/projects/${number}`;

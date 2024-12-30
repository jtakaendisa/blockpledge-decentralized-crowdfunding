import { pathnameMap, socials } from '../constants';

export type RoutePath =
  | keyof typeof pathnameMap
  | `/projects/${number}`
  | `/projects?categoryId=${number}`;

export type Social = (typeof socials)[number];

export interface TopNavLink {
  label: string;
  routePath: RoutePath;
  isEnabled: boolean | null;
}

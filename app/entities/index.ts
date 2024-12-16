import { pathnameMap, socials } from '../constants';

export type RoutePath = keyof typeof pathnameMap | `/projects/${number}`;

export type Social = (typeof socials)[number];

import { User } from 'firebase/auth';
import { z } from 'zod';

import { pathnameMap, socials } from '../constants';
import { authSchema } from '../validationSchemas';

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

export interface Stats {
  totalProjects: number;
  totalBackings: number;
  totalDonations: number;
}

export type AuthUser = User & {
  accountType: 'owner' | 'funder';
  wallet: string;
  following: number[];
  backed: number[];
};

export interface Backer {
  backer: string;
  contribution: number;
  timestamp: string;
  comment: string;
  refunded: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export type Status = 0 | 1 | 2 | 3 | 4 | 5;

export interface Project {
  id: number;
  owner: string;
  title: string;
  description: string;
  imageURLs: string[];
  categoryId: number;
  cost: number;
  raised: number;
  timestamp: number;
  expiresAt: number;
  backers: number;
  status: Status;
  date: string;
  deletionReason: string;
}

export type AuthFormData = z.infer<typeof authSchema>;

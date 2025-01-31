import { User } from 'firebase/auth';

import { pathnameMap, socials } from '../constants';
import { bigint, string } from 'zod';

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
  id: number;
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
  imageUrls: string[];
  categoryId: number;
  cost: number;
  raised: number;
  createdAt: number;
  expiresAt: number;
  backers: number;
  status: Status;
  deletionReason: string;
}

export interface ParsedCreateProjectFormData {
  title: string;
  description: string;
  imageUrls: string[];
  cost: number;
  categoryId: number;
  expiresAt: number;
}

export interface ProjectCreatedEvent {
  id: bigint;
  owner: string;
  title: string;
  description: string;
  imageUrls: string[];
  categoryId: bigint;
  cost: bigint;
  raised: bigint;
  createdAt: bigint;
  expiresAt: bigint;
  backers: bigint;
  status: Status;
}

export interface ProjectBackedEvent {
  projectId: bigint;
  contributionId: bigint;
  backer: string;
  raised: bigint;
  contribution: bigint;
  totalBackings: bigint;
  totalDonations: bigint;
  comment: string;
  timestamp: bigint;
  refunded: boolean;
}

export interface ProjectUpdatedEvent {
  id: bigint;
  description: string;
  imageUrls: string[];
  timestamp: bigint;
}

export interface ProjectTerminatedEvent {
  id: bigint;
  timestamp: bigint;
}

export interface ProjectPaidOutEvent {
  id: bigint;
  title: string;
  recipient: string;
  amount: bigint;
  timestamp: bigint;
}

import { create } from 'zustand';
import { User } from 'firebase/auth';
import Art from './components/categories/icons/Art';
import Tech from './components/categories/icons/Tech';
import Community from './components/categories/icons/Community';
import Fashion from './components/categories/icons/Fashion';
import Food from './components/categories/icons/Food';
import Gaming from './components/categories/icons/Gaming';
import Travel from './components/categories/icons/Travel';
import Education from './components/categories/icons/Education';
import Health from './components/categories/icons/Health';
import Crafts from './components/categories/icons/Crafts';
import Finance from './components/categories/icons/Finance';
import Pets from './components/categories/icons/Pets';
import { ReactNode } from 'react';

export type AuthUser = User & {
  accountType: 'owner' | 'funder';
  wallet: string;
  following: number[];
  backed: number[];
};

interface AccountStore {
  authUser: AuthUser | null;
  connectedAccount: string;
  setConnectedAccount: (account: string) => void;
  setAuthUser: (user: AuthUser | null) => void;
}

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
  status: 0 | 1 | 2 | 3 | 4 | 5;
  date: string;
  deletionReason: string;
}

export interface Stats {
  totalProjects: number;
  totalBackings: number;
  totalDonations: number;
}

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

interface ProjectStore {
  selectedCategory: Category | null;
  searchText: string;
  setSelectedCategory: (selectedCategory: Category | null) => void;
  setSearchText: (searchText: string) => void;
}

export const statusMap = {
  0: 'OPEN',
  1: 'APPROVED',
  2: 'REVERTED',
  3: 'DELETED',
  4: 'PAID OUT',
  5: 'PENDING APPROVAL',
} as const;

export const categoryImageMap: { [key: number]: ReactNode } = {
  0: <Art />,
  1: <Tech />,
  2: <Community />,
  3: <Fashion />,
  4: <Food />,
  5: <Gaming />,
  6: <Travel />,
  7: <Education />,
  8: <Health />,
  9: <Crafts />,
  10: <Finance />,
  11: <Pets />,
} as const;

const useAccountStore = create<AccountStore>((set) => ({
  authUser: null,
  connectedAccount: '',
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setConnectedAccount: (account) =>
    set((state) => ({ ...state, connectedAccount: account })),
}));

const useProjectStore = create<ProjectStore>((set) => ({
  selectedCategory: null,
  searchText: '',
  setSelectedCategory: (selectedCategory) =>
    set((state) => ({ ...state, selectedCategory })),
  setSearchText: (searchText) => set((state) => ({ ...state, searchText })),
}));

export { useAccountStore, useProjectStore };

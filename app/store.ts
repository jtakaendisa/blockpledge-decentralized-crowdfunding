import { create } from 'zustand';
import { User } from 'firebase/auth';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

export type ModalVariant = 'add' | 'back' | 'edit' | 'delete' | 'authorize';

interface ModalStore {
  addIsOpen: boolean;
  backIsOpen: boolean;
  editIsOpen: boolean;
  deleteIsOpen: boolean;
  authorizeIsOpen: boolean;
  setIsOpen: (variant: ModalVariant) => void;
}

export type AuthUser = User & {
  accountType: string;
  wallet: string;
  following: number[];
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

interface Backer {
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
  project: Project;
  projects: Project[];
  userProjects: Project[];
  stats: Stats;
  end: number;
  backers: Backer[];
  categories: Category[];
  selectedCategory: Category | null;
  searchText: string;
  setProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
  setUserProjects: (userProjects: Project[]) => void;
  setStats: (stats: Stats) => void;
  setEnd: (count: number) => void;
  setBackers: (backers: Backer[]) => void;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (selectedCategory: Category | null) => void;
  setSearchText: (searchText: string) => void;
}

const variantMap = {
  add: 'addIsOpen',
  back: 'backIsOpen',
  edit: 'editIsOpen',
  delete: 'deleteIsOpen',
  authorize: 'authorizeIsOpen',
} as const;

export const statusMap = {
  0: 'OPEN',
  1: 'APPROVED',
  2: 'REVERTED',
  3: 'DELETED',
  4: 'PAID OUT',
  5: 'PENDING APPROVAL',
} as const;

export const categoryImageMap: { [key: number]: StaticImport } = {
  0: require('@/public/icons/art.svg'),
  1: require('@/public/icons/tech.svg'),
  2: require('@/public/icons/community.svg'),
  3: require('@/public/icons/fashion.svg'),
  4: require('@/public/icons/food.svg'),
  5: require('@/public/icons/gaming.svg'),
  6: require('@/public/icons/travel.svg'),
  7: require('@/public/icons/education.svg'),
  8: require('@/public/icons/health.svg'),
  9: require('@/public/icons/crafts.svg'),
  10: require('@/public/icons/finance.svg'),
  11: require('@/public/icons/pets.svg'),
} as const;

const useModalStore = create<ModalStore>((set) => ({
  addIsOpen: false,
  backIsOpen: false,
  editIsOpen: false,
  deleteIsOpen: false,
  authorizeIsOpen: false,
  setIsOpen: (variant) =>
    set((state) => ({ [variantMap[variant]]: !state[variantMap[variant]] })),
}));

const useAccountStore = create<AccountStore>((set) => ({
  authUser: null,
  connectedAccount: '',
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setConnectedAccount: (account) =>
    set((state) => ({ ...state, connectedAccount: account })),
}));

const useProjectStore = create<ProjectStore>((set) => ({
  project: {} as Project,
  projects: [],
  userProjects: [],
  stats: {
    totalBackings: 0,
    totalDonations: 0,
    totalProjects: 0,
  },
  end: 12,
  backers: [],
  categories: [],
  selectedCategory: null,
  searchText: '',
  setProject: (project) => set((state) => ({ ...state, project })),
  setProjects: (projects) => set((state) => ({ ...state, projects })),
  setUserProjects: (userProjects) => set((state) => ({ ...state, userProjects })),
  setStats: (stats) => set((state) => ({ ...state, stats })),
  setEnd: (count) => set((state) => ({ ...state, end: state.end + count })),
  setBackers: (backers) => set((state) => ({ ...state, backers })),
  setCategories: (categories) => set((state) => ({ ...state, categories })),
  setSelectedCategory: (selectedCategory) =>
    set((state) => ({ ...state, selectedCategory })),
  setSearchText: (searchText) => set((state) => ({ ...state, searchText })),
}));

export { useModalStore, useAccountStore, useProjectStore };

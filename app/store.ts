import { User } from 'firebase/auth';
import { create } from 'zustand';

export type ModalVariant = 'add' | 'back' | 'edit' | 'delete' | 'authorize';

interface ModalStore {
  addIsOpen: boolean;
  backIsOpen: boolean;
  editIsOpen: boolean;
  deleteIsOpen: boolean;
  authorizeIsOpen: boolean;
  setIsOpen: (variant: ModalVariant) => void;
}

export type AuthUser = User & { accountType: string; wallet: string };

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

interface Category {
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
  setProject: (project: Project) => void;
  setProjects: (projects: Project[]) => void;
  setUserProjects: (userProjects: Project[]) => void;
  setStats: (stats: Stats) => void;
  setEnd: (count: number) => void;
  setBackers: (backers: Backer[]) => void;
  setCategories: (categories: Category[]) => void;
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
  setProject: (project) => set((state) => ({ ...state, project })),
  setProjects: (projects) => set((state) => ({ ...state, projects })),
  setUserProjects: (userProjects) => set((state) => ({ ...state, userProjects })),
  setStats: (stats) => set((state) => ({ ...state, stats })),
  setEnd: (count) => set((state) => ({ ...state, end: state.end + count })),
  setBackers: (backers) => set((state) => ({ ...state, backers })),
  setCategories: (categories) => set((state) => ({ ...state, categories })),
}));

export { useModalStore, useAccountStore, useProjectStore };

import { create } from 'zustand';

import { AuthUser, Category, Project, Stats } from './entities';

interface AccountStore {
  authUser: AuthUser | null;
  connectedAccount: string;
  updatingAuthUserData: boolean;
  setConnectedAccount: (account: string) => void;
  setAuthUser: (user: AuthUser | null) => void;
  setUpdatingAuthUserData: () => void;
}

interface ProjectStore {
  projects: Project[];
  stats: Stats;
  categories: Category[];
  selectedCategory: Category | null;
  searchText: string;
  updatingFollowStatus: boolean;
  setProjects: (projects: Project[]) => void;
  setStats: (stats: Stats) => void;
  setCategories: (categories: Category[]) => void;
  setSelectedCategory: (selectedCategory: Category | null) => void;
  setSearchText: (searchText: string) => void;
  setUpdatingFollowStatus: (updatingFollowStatus: boolean) => void;
}

const useAccountStore = create<AccountStore>((set) => ({
  authUser: null,
  connectedAccount: '',
  updatingAuthUserData: false,
  setAuthUser: (user) => set((state) => ({ ...state, authUser: user })),
  setConnectedAccount: (account) =>
    set((state) => ({ ...state, connectedAccount: account })),
  setUpdatingAuthUserData: () =>
    set((state) => ({ ...state, updatingAuthUserData: !state.updatingAuthUserData })),
}));

const useProjectStore = create<ProjectStore>((set) => ({
  projects: [],
  stats: {
    totalBackings: 0,
    totalDonations: 0,
    totalProjects: 0,
  },
  categories: [],
  selectedCategory: null,
  searchText: '',
  updatingFollowStatus: false,
  setProjects: (projects) => set((state) => ({ ...state, projects })),
  setStats: (stats) => set((state) => ({ ...state, stats })),
  setCategories: (categories) => set((state) => ({ ...state, categories })),
  setSelectedCategory: (selectedCategory) =>
    set((state) => ({ ...state, selectedCategory })),
  setSearchText: (searchText) => set((state) => ({ ...state, searchText })),
  setUpdatingFollowStatus: (updatingFollowStatus) =>
    set((state) => ({ ...state, updatingFollowStatus })),
}));

export { useAccountStore, useProjectStore };

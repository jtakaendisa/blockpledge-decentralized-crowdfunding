import { create } from 'zustand';

export type ModalVariant = 'add' | 'back' | 'edit' | 'delete';

interface ModalStore {
  addIsOpen: boolean;
  backIsOpen: boolean;
  editIsOpen: boolean;
  deleteIsOpen: boolean;
  setIsOpen: (variant: ModalVariant) => void;
}

interface AccountStore {
  connectedAccount: string;
  setConnectedAccount: (account: string) => void;
}

const variantMap = {
  add: 'addIsOpen',
  back: 'backIsOpen',
  edit: 'editIsOpen',
  delete: 'deleteIsOpen',
} as const;

const useModalStore = create<ModalStore>((set) => ({
  addIsOpen: false,
  backIsOpen: false,
  editIsOpen: false,
  deleteIsOpen: false,
  setIsOpen: (variant) =>
    set((state) => ({ [variantMap[variant]]: !state[variantMap[variant]] })),
}));

const useAccountStore = create<AccountStore>((set) => ({
  connectedAccount: '',
  setConnectedAccount: (account) => set(() => ({ connectedAccount: account })),
}));

export { useModalStore, useAccountStore };

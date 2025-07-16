import { create } from 'zustand';
import { UserProfile } from '../types';

interface UserStore {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

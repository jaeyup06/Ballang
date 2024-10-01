import { create } from "zustand";

type AuthStoreState = {
  currentUser: { email: string } | null;
  setCurrentUser: (user: { email: string } | null) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));

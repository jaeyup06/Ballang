import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStoreState = {
  currentUser: { email: string } | null;
  setCurrentUser: (user: { email: string } | null) => void;
};

export const useAuthStore = create<AuthStoreState>()(
  persist<AuthStoreState>((set) => ({
    currentUser: null,
    setCurrentUser: (user) => set({ currentUser: user }),
  }), {
    name: "userEmailStorage",
  })
);

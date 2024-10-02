import { create } from "zustand";

interface AuthStoreState {
  isLoggedIn: boolean;
  isAuthInitialized: boolean;
  setIsAuthInitialized: (status: boolean) => void;
  setIsLoggedIn: (status: boolean) => void;
}

export const useAuthStore = create<AuthStoreState>((set) => ({
  isLoggedIn: false,
  isAuthInitialized: false,
  setIsAuthInitialized: (status) => set({ isAuthInitialized: status }),
  setIsLoggedIn: (status) => set({ isLoggedIn: status }),
}));

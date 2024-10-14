import { getCookie } from 'cookies-next';
import { create } from 'zustand';

interface User {
  userId: string;
  name: string;
  email: string;
  walletId: string;
  coinsCollected: number;
  createdAt: string;
  updatedAt: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
  login: (user: any) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  login: (user) => set({ isAuthenticated: true, user }),
  logout: () => {
    // Remove the cookie here
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    set({ isAuthenticated: false, user: null });
  },
  checkAuth: () => {
    const token = getCookie('token');
    set({ isAuthenticated: !!token });
  },
}));

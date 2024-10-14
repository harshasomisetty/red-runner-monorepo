import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useCallback, useEffect, useState } from 'react';

export interface User {
  userId: string;
  name: string;
  email: string;
  walletId?: string;
  coinsCollected?: number;
  createdAt?: string;
  updatedAt?: string;
}

export function useUser() {
  const [userData, setUserData] = useState<{
    user: User | null;
    loading: boolean;
  }>({ user: null, loading: true });

  const fetchUser = useCallback(() => {
    const userCookie = getCookie('user');
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie as string);
        setUserData({ user: userData, loading: false });
      } catch (error) {
        console.error('Error parsing user cookie:', error);
        setUserData({ user: null, loading: false });
      }
    } else {
      setUserData({ user: null, loading: false });
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const refetch = useCallback(() => {
    fetchUser();
  }, [fetchUser]);

  const updateUser = useCallback((newUserData: User) => {
    setUserData({ user: newUserData, loading: false });
    setCookie('user', JSON.stringify(newUserData), {
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
  }, []);

  const logout = useCallback(async () => {
    setUserData({ user: null, loading: false });
    deleteCookie('user');
    deleteCookie('token');
    await new Promise((resolve) => setTimeout(resolve, 100));
  }, []);

  return {
    ...userData,
    refetch,
    updateUser,
    logout,
  };
}

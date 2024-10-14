'use client';

import { useUser } from '@/app/hooks/useUser';
import { useWallet } from '@solana/wallet-adapter-react';

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className = '' }: LogoutButtonProps) {
  const { logout, refetch } = useUser();
  const { disconnect } = useWallet();

  const handleLogout = async () => {
    try {
      await disconnect();

      await logout();

      localStorage.clear();

      refetch();

      window.location.reload();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={`bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 ${className}`}
    >
      Logout
    </button>
  );
}

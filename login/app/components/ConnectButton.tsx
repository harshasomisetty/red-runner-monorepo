'use client';

import { User } from '@/app/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface ConnectButtonProps {
  sessionId: string;
  user: User;
}

export default function ConnectButton({ sessionId, user }: ConnectButtonProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      if (!user.walletId) {
        throw new Error('User wallet not found');
      }

      const response = await fetch('/api/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          wallet: user.walletId,
          email: user.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect');
      }

      const result = await response.json();

      if (result.success) {
        console.log('Successfully connected');
        setIsConnected(true);
      } else {
        throw new Error(result.error || 'Failed to connect');
      }
    } catch (error) {
      console.error('Error connecting:', error);
      // Handle error (e.g., show an error message)
    } finally {
      setIsConnecting(false);
    }
  };

  if (isConnected) {
    return (
      <p className="text-green-600 font-bold text-center">
        You have been connected to Red Runner!
      </p>
    );
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 disabled:bg-purple-400 disabled:cursor-not-allowed"
    >
      {isConnecting ? 'Connecting...' : 'Connect to Game'}
    </button>
  );
}

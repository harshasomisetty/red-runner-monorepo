'use client';
import { useUser } from '@/app/hooks/useUser';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import LogoutButton from './LogoutButton';
import Profile from './Profile';

export default function Login({ sessionId }: { sessionId?: string }) {
  const { connected, publicKey, disconnect } = useWallet();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const { user, loading, refetch, logout } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const isConnectPage = pathname.startsWith('/connect/');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || !publicKey || !email) {
      console.error('Wallet not connected or email not provided');
      return;
    }
    setIsLoading(true);
    const newWallet = publicKey.toBase58();
    try {
      const body: any = { wallet: newWallet, email };
      if (sessionId) {
        body.sessionId = sessionId;
      }
      const response = await fetch('/api/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to connect wallet');
      }
      await refetch(); // Refetch user data after successful login
      setIsFinished(true);
    } catch (error) {
      console.error('Login error:', error);
      setError(
        error instanceof Error ? error.message : 'An unknown error occurred',
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    if (sessionId) {
      return (
        <div className="text-center">
          <h1 className="text-2xl text-[#7C3AED] font-integral font-bold mb-6 uppercase">
            Welcome, {user?.name || 'User'}!
          </h1>
          <p className="text-lg text-gray-700 mb-4">
            You are connected to Gameshift.
          </p>
          <LogoutButton className="mt-4" />
        </div>
      );
    } else {
      return <Profile user={user} />;
    }
  }

  return (
    <div className="flex flex-col items-center justify-start p-10 border">
      <h1 className="text-2xl text-[#7C3AED] font-integral font-bold mb-6 text-center uppercase">
        {connected ? 'Please Add Your Email' : 'Please Connect Your Wallet'}
      </h1>
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}
      <form
        onSubmit={handleLogin}
        className="flex flex-col items-center space-y-4 w-full max-w-sm p-4"
      >
        <WalletMultiButton className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300" />
        {connected && (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
            placeholder="Enter your email"
            required
            autoComplete="email"
          />
        )}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 transition duration-300 disabled:bg-purple-400 disabled:cursor-not-allowed"
          disabled={isLoading || !email || !connected}
        >
          {isLoading
            ? 'Processing...'
            : isConnectPage
            ? 'Connect to Game'
            : 'Login'}
        </button>
        <p className="text-black text-sm text-center">
          By providing your email address, you agree to, and represent that you
          have read, GameShift&apos;s{' '}
          <a
            href="https://app.gameshift.dev/tos_03-23-24.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            Terms of Service
          </a>
          ,{' '}
          <a
            href="https://app.gameshift.dev/privacy-policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            Privacy Policy
          </a>
          , and{' '}
          <a
            href="https://app.gameshift.dev/Gameshift_Cookie_Policy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-600 hover:underline"
          >
            Cookie Policy
          </a>
          .
        </p>
      </form>
    </div>
  );
}

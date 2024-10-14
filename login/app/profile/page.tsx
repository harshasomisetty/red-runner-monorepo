'use client';

import Login from '@/app/components/Login';
import { useUser } from '@/app/hooks/useUser';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, loading, refetch } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-purple-700 mb-6">User Profile</h1>
      <Link
        href="/"
        className="text-purple-600 hover:text-purple-800 mt-4 block"
      >
        Back to Leaderboard
      </Link>
      <Login />
    </div>
  );
}

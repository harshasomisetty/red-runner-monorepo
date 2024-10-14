'use client';

import Link from 'next/link';
import LeaderboardDisplay from './components/LeaderboardDisplay';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Leaderboard</h1>
        <Link
          href="/profile"
          className="inline-block bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 mb-6"
        >
          View Profile
        </Link>
      </div>
      <LeaderboardDisplay />
    </div>
  );
}

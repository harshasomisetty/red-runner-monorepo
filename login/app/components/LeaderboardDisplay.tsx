'use client';

import { useEffect, useState } from 'react';
import { useUser } from '../hooks/useUser';

interface LeaderboardEntry {
  name: string;
  userId: string;
  score: number;
  createdAt: string;
  updatedAt: string;
}

export default function LeaderboardDisplay() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/get-leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        setLeaderboard(data.data);
      } catch (err) {
        setError('Failed to load leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div>Loading leaderboard...</div>;
  if (error) return <div>Error: {error}</div>;

  const userRank =
    leaderboard.findIndex((entry) => entry.userId === user?.userId) + 1;

  return (
    <div className="p-4 rounded-lg text-black bg-sky-200/80">
      <div className="grid grid-cols-12 gap-4 mb-4 font-bold text-xl">
        <div className="col-span-2">Rank</div>
        <div className="col-span-7">Username</div>
        <div className="col-span-3 text-right">Distance</div>
      </div>
      {leaderboard.map((entry, index) => (
        <div
          key={entry.userId}
          className="grid grid-cols-12 gap-4 items-center p-2 mb-2 rounded-lg"
        >
          <div className="col-span-2 text-2xl">{index + 1}</div>
          <div className="col-span-7">{entry.name}</div>
          <div className="col-span-3 text-right">{entry.score} m</div>
        </div>
      ))}
    </div>
  );
}

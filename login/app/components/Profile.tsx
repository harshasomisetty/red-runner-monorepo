'use client';

import { User } from '../hooks/useUser';
import LogoutButton from './LogoutButton';

interface ProfileProps {
  user: User;
}

export default function Profile({ user }: ProfileProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-4 text-black border border-fuchsia-400">
      <div className="space-y-2">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">User ID:</span> {user.userId}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        {user.walletId && (
          <p>
            <span className="font-semibold">Wallet ID:</span> {user.walletId}
          </p>
        )}
        {user.coinsCollected !== undefined && (
          <p>
            <span className="font-semibold">Coins Collected:</span>{' '}
            {user.coinsCollected}
          </p>
        )}
        {user.createdAt && (
          <p>
            <span className="font-semibold">Created At:</span>{' '}
            {new Date(user.createdAt).toLocaleString()}
          </p>
        )}
        {user.updatedAt && (
          <p>
            <span className="font-semibold">Last Updated:</span>{' '}
            {new Date(user.updatedAt).toLocaleString()}
          </p>
        )}
      </div>
      <LogoutButton className="mt-4" />
    </div>
  );
}

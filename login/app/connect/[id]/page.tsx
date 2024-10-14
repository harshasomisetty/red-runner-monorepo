'use client';
import ConnectButton from '@/app/components/ConnectButton';
import Login from '@/app/components/Login';
import LogoutButton from '@/app/components/LogoutButton';
import { useUser } from '@/app/hooks/useUser';

export default function Page({ params }: { params: { id: string } }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-200 flex flex-col items-center justify-start p-6 border border-green-500">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          {user ? (
            <>
              <h1 className="text-2xl font-bold text-purple-600 mb-4 text-center">
                WELCOME, {user.name.toUpperCase()}!
              </h1>
              <p className="text-gray-600 mb-6 text-center">
                You are already connected to Gameshift.
              </p>
              <div className="flex flex-col space-y-4">
                <ConnectButton sessionId={params.id} user={user} />
                <LogoutButton />
              </div>
            </>
          ) : (
            <Login sessionId={params.id} />
          )}
        </div>
      </div>
    </div>
  );
}

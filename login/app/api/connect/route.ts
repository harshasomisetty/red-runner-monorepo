import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { sessionId, wallet, email } = await request.json();

  if (!wallet || !email) {
    return NextResponse.json(
      { success: false, error: 'Invalid data' },
      { status: 400 },
    );
  }

  console.log('body', JSON.stringify({ sessionId, wallet, email }));

  const body: { wallet: any; email: any; sessionId?: string } = {
    wallet,
    email,
  };
  if (sessionId) {
    body.sessionId = sessionId;
  }

  const response = await fetch(
    `${process.env.BACKEND_URL}/v1/auth/wallet-login`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );

  const data = await response.json();

  console.log('response:', data);

  if (!response.ok) {
    return NextResponse.json(
      { success: false, error: data.message || 'Failed to connect wallet' },
      { status: response.status },
    );
  }

  // Set cookies
  const cookieStore = cookies();
  cookieStore.set('token', data.tokens.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  // Set user cookie
  const userInfo = {
    userId: data.user.userId,
    name: data.user.name,
    email: data.user.email,
    walletId: data.user.walletId,
    coinsCollected: data.user.coinsCollected,
    createdAt: data.user.createdAt,
    updatedAt: data.user.updatedAt,
  };
  cookieStore.set('user', JSON.stringify(userInfo), {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });

  return NextResponse.json({
    success: true,
    user: data.user,
  });
}

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('POST request received in /api/connect/route.ts');

  try {
    const { sessionId, wallet, email } = await request.json();
    console.log('Parsed request body:', { sessionId, wallet, email });

    if (!wallet || !email) {
      console.log('Invalid data: wallet or email missing');
      return NextResponse.json(
        { success: false, error: 'Invalid data' },
        { status: 400 },
      );
    }

    console.log('Preparing request body for backend');
    const body: { wallet: any; email: any; sessionId?: string } = {
      wallet,
      email,
    };
    if (sessionId) {
      body.sessionId = sessionId;
    }
    console.log('Request body for backend:', body);

    const backendUrl = `${process.env.BACKEND_URL}/v1/auth/wallet-login`;
    console.log('Sending request to backend URL:', backendUrl);

    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    console.log('Backend response status:', response.status);
    const data = await response.json();
    console.log('Backend response data:', data);

    if (!response.ok) {
      console.log('Backend request failed');
      return NextResponse.json(
        { success: false, error: data.message || 'Failed to connect wallet' },
        { status: response.status },
      );
    }

    console.log('Setting cookies');
    const cookieStore = cookies();
    cookieStore.set('token', data.tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

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

    console.log('Returning successful response');
    return NextResponse.json({
      success: true,
      user: data.user,
    });
  } catch (error) {
    console.error('Error in POST /api/connect/route.ts:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

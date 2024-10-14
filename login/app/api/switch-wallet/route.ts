import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { sessionId, wallet } = await request.json();

  if (!sessionId || !wallet) {
    return NextResponse.json(
      { success: false, error: 'Invalid data' },
      { status: 400 },
    );
  }

  if (
    !global.sessions[sessionId] ||
    !global.sessions[sessionId].connectedWallets.includes(wallet)
  ) {
    return NextResponse.json(
      { success: false, error: 'Invalid session or wallet' },
      { status: 400 },
    );
  }

  global.sessions[sessionId].activeWallet = wallet;
  global.sessions[sessionId].timestamp = Date.now();

  return NextResponse.json({ success: true, activeWallet: wallet });
}

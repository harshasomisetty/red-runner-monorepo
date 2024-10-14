import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const cookieStore = cookies();

  // Clear the token cookie
  cookieStore.delete('token');

  // Clear the user cookie
  cookieStore.delete('user');

  return NextResponse.json({ success: true });
}

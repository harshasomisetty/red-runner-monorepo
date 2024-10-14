import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  //   const userId = searchParams.get('userId');
  const userId = 'user_60d897d7-1501-43ba-8a33-53fc74a12398';

  if (!userId) {
    return NextResponse.json(
      { success: false, error: 'userId is required' },
      { status: 400 },
    );
  }

  console.log('Fetching leaderboard for userId:', userId);

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/v1/leaderboard/getLeaderboardNoAuth`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authentication headers here
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const leaderboardData = await response.json();
    console.log('leaderboardData', leaderboardData);
    return NextResponse.json({ success: true, data: leaderboardData });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 },
    );
  }
}

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { getUserInfo } from '@/lib/authApi';

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token')?.value;

  if (!authToken) {
    return new NextResponse(null, { status: 401 });
  }

  try {
    const user = await getUserInfo(authToken);
    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return new NextResponse(null, { status: 500 });
  }
} 
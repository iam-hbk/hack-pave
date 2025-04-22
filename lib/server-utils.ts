'use server';

import { cookies } from 'next/headers';
import type { User } from './authApi';

// Server-side function to get user from cookies
export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const userData = cookieStore.get('user_data');
  const authToken = cookieStore.get('auth_token');

  if (!userData || !authToken) {
    return null;
  }

  try {
    return JSON.parse(userData.value) as User;
  } catch (error) {
    console.error('Error parsing user data:', error);
    return null;
  }
} 
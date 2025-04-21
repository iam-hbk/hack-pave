'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createSession, verifyCredentials, UserRole } from '@/lib/dal';

export async function login(prevState: { error: string | null }, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as UserRole;
  const callbackUrl = formData.get('callbackUrl') as string;

  try {
    const user = await verifyCredentials(email, password, role);
    
    if (!user) {
      return { error: 'Invalid credentials' };
    }

    // Create JWT session
    const token = await createSession(user);
    const cookieStore = await cookies();

    // Set HttpOnly cookie with JWT
    cookieStore.set('jwt_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      path: '/',
    });

    // Redirect after successful login
    redirect(callbackUrl || '/dashboard');
  } catch (error) {
    console.error('Login error:', error);
    return { error: 'An error occurred during login' };
  }
}

export async function logout() {
  // Clear the JWT cookie
  const cookieStore = await cookies();
  cookieStore.set('jwt_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(0),
    path: '/',
  });

  redirect('/login');
} 
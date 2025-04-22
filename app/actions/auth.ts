'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { login as apiLogin, logout as apiLogout, register as apiRegister } from '@/lib/authApi';
import type { UserRole } from '@/lib/authApi';

export async function login(formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();

  if (!email || !password) {
    return { error: 'Email and password are required' };
  }

  try {
    const response = await apiLogin(email, password, 'STUDENT' as UserRole);
    const cookieStore = await cookies();
    
    await cookieStore.set('auth_token', response.key, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    redirect('/dashboard');
  } catch (error) {
    return { error: 'Invalid credentials' };
  }
}

export async function logout() {
  try {
    await apiLogout();
    const cookieStore = await cookies();
    
    await cookieStore.delete('auth_token');
    
    redirect('/');
  } catch (error) {
    return { error: 'Failed to logout' };
  }
}

export async function register(formData: FormData) {
  try {
    // Validate required fields
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password1 = formData.get('password1') as string;
    const password2 = formData.get('password2') as string;

    if (!username || !email || !password1 || !password2) {
      return { error: 'All fields are required' };
    }

    // Call the API to register
    const response = await apiRegister({
      username,
      email,
      password1,
      password2,
    });

    if (!response || !response.key) {
      return { error: 'Registration failed' };
    }

    // Set the auth token cookie securely
    const cookieStore = await cookies();
    cookieStore.set('auth_token', response.key, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    // Only redirect after successful cookie setting
    redirect('/dashboard');
  } catch (error) {
    console.error('Registration error:', error);
    return { error: error instanceof Error ? error.message : 'An error occurred during registration' };
  }
} 
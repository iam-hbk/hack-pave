'use server';
import 'server-only';

import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import type { User } from './authApi';
import { getUserInfo } from './authApi';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-min-32-chars-long",
);
const JWT_EXPIRES_IN = "7d";

export interface Session {
  user: User | null;
  isAuthenticated: boolean;
}

export async function verifySession(request?: NextRequest): Promise<Session> {
  try {
    let authToken: string | undefined;

    if (request) {
      // Middleware context
      authToken = request.cookies.get("auth_token")?.value;
    } else {
      // Server component/route handler context
      const cookieStore = await cookies();
      authToken = cookieStore.get("auth_token")?.value;
    }

    if (!authToken) {
      return { user: null, isAuthenticated: false };
    }

    try {
      const user = await getUserInfo(authToken);
      return { user, isAuthenticated: true };
    } catch (error) {
      console.error("Error fetching user data:", error);
      return { user: null, isAuthenticated: false };
    }
  } catch (error) {
    console.error("Session verification failed:", error);
    return { user: null, isAuthenticated: false };
  }
}

export async function createSession(user: User): Promise<string> {
  const token = await new SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(JWT_EXPIRES_IN)
    .setIssuedAt()
    .sign(JWT_SECRET);

  return token;
}

// Server-side function to get user from cookies
export async function getUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const authToken = cookieStore.get('auth_token')?.value;

  if (!authToken) {
    return null;
  }

  try {
    return await getUserInfo(authToken);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

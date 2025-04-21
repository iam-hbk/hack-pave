import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-min-32-chars-long",
);
const JWT_EXPIRES_IN = "7d";

export type UserRole = "STUDENT" | "INSTRUCTOR" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Session {
  user: User | null;
  isAuthenticated: boolean;
}

export async function verifySession(request?: NextRequest): Promise<Session> {
  try {
    // Use request in middleware, otherwise use cookies() in RSC/Route Handlers
    const cookieStore = request ? request.cookies : await cookies();
    const token = cookieStore.get("jwt_token")?.value;

    if (!token) {
      return { user: null, isAuthenticated: false };
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    const user = payload.user as User;
    return { user, isAuthenticated: true };
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

// Helper to get user in Server Components/Route Handlers
export async function getUser(): Promise<User | null> {
  const { user } = await verifySession();
  return user;
}

// Mock database functions - Replace these with your actual database calls
export async function verifyCredentials(
  email: string,
  password: string,
  role: UserRole = "STUDENT", // Default to STUDENT if not provided
): Promise<User | null> {
  // TODO: Replace with actual database verification
  if (password === "fail") return null;

  return {
    id: "123",
    name: email.split("@")[0],
    email,
    role,
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
  };
}

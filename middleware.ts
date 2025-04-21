import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/dal'

// List of public routes that don't require authentication
const publicRoutes = ['/','/login', '/register']
// List of auth routes that should redirect to dashboard if authenticated
const authRoutes = ['/login', '/register']
// List of protected routes that require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Verify session using our DAL
  const { isAuthenticated, user } = await verifySession(request)

  // Create the URL for redirection
  const loginUrl = new URL('/login', request.url)
  const dashboardUrl = new URL('/dashboard', request.url)
  
  // Add the original URL as a query parameter for post-login redirect
  loginUrl.searchParams.set('callbackUrl', pathname)

  // Check if the requested path requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.includes(pathname)

  // Handle authentication and authorization
  if (!isAuthenticated && isProtectedRoute) {
    // Redirect unauthenticated users to login
    return NextResponse.redirect(loginUrl)
  }

  if (isAuthenticated && isAuthRoute) {
    // Redirect authenticated users away from auth pages
    return NextResponse.redirect(dashboardUrl)
  }

  // Role-based access control (if needed)
  if (isAuthenticated && user) {
    // Example: Only allow admins to access /admin routes
    if (pathname.startsWith('/admin') && user.role !== 'ADMIN') {
      return new NextResponse(null, { status: 403 }) // Forbidden
    }
  }

  return NextResponse.next()
}

// Configure the paths that middleware will run on
export const config = {
  matcher: [
    /*
     * Match all routes except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * Add or modify based on your application's needs
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
} 
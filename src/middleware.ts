import { NextRequest, NextResponse } from 'next/server'

async function checkMaintenanceStatus() {
  try {
    // In static export, we can't read files from the server
    // So we'll rely on client-side checks and environment variables
    return process.env.MAINTENANCE_MODE === 'true'
  } catch (error) {
    console.warn('Could not check maintenance status:', error)
    return false
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for static assets, API routes, and maintenance/admin pages
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    pathname === '/maintenance' ||
    pathname === '/admin'
  ) {
    return NextResponse.next()
  }
  
  // Check for maintenance mode bypass
  const bypassKey = request.nextUrl.searchParams.get('bypass')
  const maintBypassCookie = request.cookies.get('dslt_maintenance_bypass')
  
  if (bypassKey === 'dslt_admin_2025' || maintBypassCookie?.value === 'true') {
    // Set bypass cookie if key is provided
    if (bypassKey === 'dslt_admin_2025') {
      const response = NextResponse.next()
      response.cookies.set('dslt_maintenance_bypass', 'true', {
        maxAge: 60 * 60 * 24, // 24 hours
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      return response
    }
    return NextResponse.next()
  }
  
  // Check if maintenance mode is enabled
  const maintenanceEnabled = await checkMaintenanceStatus()
  
  if (maintenanceEnabled) {
      return NextResponse.redirect(new URL('/maintenance.html', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - maintenance-status.json (maintenance config file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|maintenance-status.json).*)',
  ],
}
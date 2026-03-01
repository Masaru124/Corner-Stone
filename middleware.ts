import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_SESSION_COOKIE, getAdminSessionValue } from '@/lib/admin-auth'

function isAuthenticated(request: NextRequest) {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value === getAdminSessionValue()
}

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname === '/api/admin/login' ||
    request.nextUrl.pathname === '/api/admin/logout'
  ) {
    return NextResponse.next()
  }

  if (isAuthenticated(request)) {
    return NextResponse.next()
  }

  if (request.nextUrl.pathname.startsWith('/api/admin/')) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const loginUrl = new URL('/admin', request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/dashboard/:path*', '/api/admin/:path*'],
}

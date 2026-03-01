import { NextRequest, NextResponse } from 'next/server'

export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'Wilson'
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Wilson'
export const ADMIN_SESSION_COOKIE = 'admin_session'
const ADMIN_SESSION_VALUE = process.env.ADMIN_SESSION_VALUE || 'Wilson'

export function getAdminSessionValue() {
  return ADMIN_SESSION_VALUE
}

export function isValidAdminCredentials(username: string, password: string) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export function isAdminRequestAuthenticated(request: NextRequest) {
  return request.cookies.get(ADMIN_SESSION_COOKIE)?.value === ADMIN_SESSION_VALUE
}

export function setAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: ADMIN_SESSION_VALUE,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
    path: '/',
  })
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  })
}

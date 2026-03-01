import { NextRequest, NextResponse } from 'next/server'
import { isValidAdminCredentials, setAdminSessionCookie } from '@/lib/admin-auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const username = String(body?.username ?? '')
    const password = String(body?.password ?? '')

    if (!isValidAdminCredentials(username, password)) {
      return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    setAdminSessionCookie(response)
    return response
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 })
  }
}

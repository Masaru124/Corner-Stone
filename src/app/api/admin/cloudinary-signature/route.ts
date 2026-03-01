import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequestAuthenticated } from '@/lib/admin-auth'
import { createCloudinaryUploadSignature } from '@/lib/cloudinary'

const DEFAULT_UPLOAD_FOLDER = 'corner-stone/admin'

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const folder = String(body?.folder || DEFAULT_UPLOAD_FOLDER)
    const timestamp = Math.floor(Date.now() / 1000)

    const signatureData = createCloudinaryUploadSignature(folder, timestamp)
    return NextResponse.json({ success: true, ...signatureData })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate signature',
      },
      { status: 500 }
    )
  }
}

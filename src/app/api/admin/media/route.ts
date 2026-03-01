import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequestAuthenticated } from '@/lib/admin-auth'
import { insertMediaUpload, listMediaUploads } from '@/lib/neon'

export async function GET(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const uploads = await listMediaUploads()
    return NextResponse.json({ success: true, uploads })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch media',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const publicId = String(body?.public_id ?? '')
    const secureUrl = String(body?.secure_url ?? '')
    const resourceType = body?.resource_type === 'video' ? 'video' : body?.resource_type === 'image' ? 'image' : null

    if (!publicId || !secureUrl || !resourceType) {
      return NextResponse.json({ success: false, error: 'Missing required media fields' }, { status: 400 })
    }

    const uploaded = await insertMediaUpload({
      publicId,
      secureUrl,
      resourceType,
      format: typeof body?.format === 'string' ? body.format : null,
      bytes: typeof body?.bytes === 'number' ? body.bytes : null,
      width: typeof body?.width === 'number' ? body.width : null,
      height: typeof body?.height === 'number' ? body.height : null,
      duration: typeof body?.duration === 'number' ? body.duration : null,
    })

    return NextResponse.json({ success: true, upload: uploaded })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save media',
      },
      { status: 500 }
    )
  }
}

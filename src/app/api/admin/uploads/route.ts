import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequestAuthenticated } from '@/lib/admin-auth'
import { uploadImageToCloudinary } from '@/lib/cloudinary'

const DEFAULT_UPLOAD_FOLDER = 'corner-stone/posts'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const fileValue = formData.get('file')
    const folderValue = formData.get('folder')

    if (!(fileValue instanceof File)) {
      return NextResponse.json({ success: false, error: 'Image file is required' }, { status: 400 })
    }

    if (!fileValue.type.startsWith('image/')) {
      return NextResponse.json({ success: false, error: 'Only image files are supported' }, { status: 400 })
    }

    const folder = typeof folderValue === 'string' && folderValue.trim() ? folderValue.trim() : DEFAULT_UPLOAD_FOLDER
    const arrayBuffer = await fileValue.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)

    const uploaded = await uploadImageToCloudinary({
      fileBuffer,
      folder,
    })

    if (!uploaded.secureUrl) {
      return NextResponse.json({ success: false, error: 'Cloudinary did not return a URL' }, { status: 500 })
    }

    return NextResponse.json({ success: true, upload: uploaded })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to upload image'
    console.error('Admin image upload failed:', error)

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    )
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequestAuthenticated } from '@/lib/admin-auth'
import { createResource, listResources, generateSlug } from '@/lib/resources'

export async function GET(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const resources = await listResources(true)
    return NextResponse.json({ success: true, resources })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to load resources' },
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
    const title = String(body?.title ?? '').trim()
    const slugInput = String(body?.slug ?? '').trim()
    const description = String(body?.description ?? '').trim()
    const content = String(body?.content ?? '').trim()
    const category = String(body?.category ?? '').trim()
    const readTime = String(body?.readTime ?? '').trim()
    const imageUrl = body?.imageUrl ? String(body.imageUrl).trim() : null
    const featured = Boolean(body?.featured)

    if (!title || !description || !content || !category) {
      return NextResponse.json(
        { success: false, error: 'Title, description, content, and category are required' },
        { status: 400 }
      )
    }

    const slug = slugInput || generateSlug(title)

    const createdResource = await createResource({
      title,
      slug,
      description,
      content,
      category,
      readTime: readTime || '5 min read',
      imageUrl,
      featured,
    })

    return NextResponse.json({ success: true, resource: createdResource })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create resource' },
      { status: 500 }
    )
  }
}

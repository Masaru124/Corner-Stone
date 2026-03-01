import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequestAuthenticated } from '@/lib/admin-auth'
import { createPortfolioPost, listPortfolioPosts } from '@/lib/posts'

export async function GET(request: NextRequest) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const posts = await listPortfolioPosts(true)
    return NextResponse.json({ success: true, posts })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to load posts' },
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
    const type = String(body?.type ?? '').trim()
    const description = String(body?.description ?? '').trim()
    const images = Array.isArray(body?.images)
      ? body.images.filter((item: unknown) => typeof item === 'string' && item.trim()).map((item: string) => item.trim())
      : []
    const tags = Array.isArray(body?.tags)
      ? body.tags.filter((item: unknown) => typeof item === 'string' && item.trim()).map((item: string) => item.trim())
      : []
    const imageFit = body?.imageFit === 'cover' ? 'cover' : 'contain'
    const imageSize = body?.imageSize === 'small' || body?.imageSize === 'large' ? body.imageSize : 'medium'
    const parsedColumns = Number(body?.imageColumns)
    const imageColumns = Number.isInteger(parsedColumns) && parsedColumns >= 1 && parsedColumns <= 3 ? parsedColumns : null

    if (!title || !type || !description) {
      return NextResponse.json(
        { success: false, error: 'Title, type, and description are required' },
        { status: 400 }
      )
    }

    const createdPost = await createPortfolioPost({
      title,
      type,
      description,
      images,
      tags,
      imageFit,
      imageSize,
      imageColumns,
    })

    return NextResponse.json({ success: true, post: createdPost })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create post' },
      { status: 500 }
    )
  }
}

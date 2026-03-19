import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequestAuthenticated } from '@/lib/admin-auth'
import { deletePortfolioPost, updatePortfolioPost } from '@/lib/posts'

function parsePostId(id: string): number | null {
  const parsed = Number(id)
  if (!Number.isInteger(parsed) || parsed <= 0) {
    return null
  }

  return parsed
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params
  const postId = parsePostId(id)

  if (!postId) {
    return NextResponse.json({ success: false, error: 'Invalid post id' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const updateInput: {
      title?: string
      type?: string
      description?: string
      tags?: string[]
      images?: string[]
      hidden?: boolean
      imageFit?: 'contain' | 'cover'
      imageSize?: 'small' | 'medium' | 'large'
      imageColumns?: number | null
    } = {}

    if (typeof body?.title === 'string') {
      const title = body.title.trim()
      if (!title) {
        return NextResponse.json({ success: false, error: 'Title cannot be empty' }, { status: 400 })
      }

      updateInput.title = title
    }

    if (typeof body?.type === 'string') {
      const type = body.type.trim()
      if (!type) {
        return NextResponse.json({ success: false, error: 'Type cannot be empty' }, { status: 400 })
      }

      updateInput.type = type
    }

    if (typeof body?.description === 'string') {
      const description = body.description.trim()
      if (!description) {
        return NextResponse.json({ success: false, error: 'Description cannot be empty' }, { status: 400 })
      }

      updateInput.description = description
    }

    if (Array.isArray(body?.tags)) {
      updateInput.tags = body.tags
        .filter((item: unknown) => typeof item === 'string')
        .map((item: string) => item.trim())
        .filter(Boolean)
    }

    if (Array.isArray(body?.images)) {
      updateInput.images = body.images
        .filter((item: unknown) => typeof item === 'string')
        .map((item: string) => item.trim())
        .filter(Boolean)
    }

    if (typeof body?.hidden === 'boolean') {
      updateInput.hidden = body.hidden
    }

    if (body?.imageFit === 'contain' || body?.imageFit === 'cover') {
      updateInput.imageFit = body.imageFit
    }

    if (body?.imageSize === 'small' || body?.imageSize === 'medium' || body?.imageSize === 'large') {
      updateInput.imageSize = body.imageSize
    }

    if (body?.imageColumns === null) {
      updateInput.imageColumns = null
    } else {
      const parsedColumns = Number(body?.imageColumns)
      if (Number.isInteger(parsedColumns) && parsedColumns >= 1 && parsedColumns <= 3) {
        updateInput.imageColumns = parsedColumns
      }
    }

    if (Object.keys(updateInput).length === 0) {
      return NextResponse.json({ success: false, error: 'No valid fields to update' }, { status: 400 })
    }

    const updatedPost = await updatePortfolioPost(postId, updateInput)
    if (!updatedPost) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, post: updatedPost })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params
  const postId = parsePostId(id)

  if (!postId) {
    return NextResponse.json({ success: false, error: 'Invalid post id' }, { status: 400 })
  }

  try {
    const deleted = await deletePortfolioPost(postId)
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to delete post' },
      { status: 500 }
    )
  }
}

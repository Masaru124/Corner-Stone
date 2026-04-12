import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequestAuthenticated } from '@/lib/admin-auth'
import { deleteResource, updateResource } from '@/lib/resources'

function parseResourceId(id: string): number | null {
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
  const resourceId = parseResourceId(id)

  if (!resourceId) {
    return NextResponse.json({ success: false, error: 'Invalid resource id' }, { status: 400 })
  }

  try {
    const body = await request.json()
    const updateInput: {
      title?: string
      slug?: string
      description?: string
      content?: string
      category?: string
      readTime?: string
      imageUrl?: string | null
      featured?: boolean
      hidden?: boolean
    } = {}

    if (typeof body?.title === 'string') {
      const title = body.title.trim()
      if (!title) {
        return NextResponse.json({ success: false, error: 'Title cannot be empty' }, { status: 400 })
      }
      updateInput.title = title
    }

    if (typeof body?.slug === 'string') {
      const slug = body.slug.trim()
      if (!slug) {
        return NextResponse.json({ success: false, error: 'Slug cannot be empty' }, { status: 400 })
      }
      updateInput.slug = slug
    }

    if (typeof body?.description === 'string') {
      const description = body.description.trim()
      if (!description) {
        return NextResponse.json({ success: false, error: 'Description cannot be empty' }, { status: 400 })
      }
      updateInput.description = description
    }

    if (typeof body?.content === 'string') {
      const content = body.content.trim()
      if (!content) {
        return NextResponse.json({ success: false, error: 'Content cannot be empty' }, { status: 400 })
      }
      updateInput.content = content
    }

    if (typeof body?.category === 'string') {
      const category = body.category.trim()
      if (!category) {
        return NextResponse.json({ success: false, error: 'Category cannot be empty' }, { status: 400 })
      }
      updateInput.category = category
    }

    if (typeof body?.readTime === 'string') {
      updateInput.readTime = body.readTime.trim()
    }

    if (body?.imageUrl === null || typeof body?.imageUrl === 'string') {
      updateInput.imageUrl = body.imageUrl
    }

    if (typeof body?.featured === 'boolean') {
      updateInput.featured = body.featured
    }

    if (typeof body?.hidden === 'boolean') {
      updateInput.hidden = body.hidden
    }

    if (Object.keys(updateInput).length === 0) {
      return NextResponse.json({ success: false, error: 'No valid fields to update' }, { status: 400 })
    }

    const updatedResource = await updateResource(resourceId, updateInput)
    if (!updatedResource) {
      return NextResponse.json({ success: false, error: 'Resource not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true, resource: updatedResource })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update resource' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  if (!isAdminRequestAuthenticated(request)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  const { id } = await context.params
  const resourceId = parseResourceId(id)

  if (!resourceId) {
    return NextResponse.json({ success: false, error: 'Invalid resource id' }, { status: 400 })
  }

  try {
    const deleted = await deleteResource(resourceId)
    if (!deleted) {
      return NextResponse.json({ success: false, error: 'Resource not found' }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to delete resource' },
      { status: 500 }
    )
  }
}

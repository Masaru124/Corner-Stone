import { NextResponse } from 'next/server'
import { listPortfolioPosts } from '@/lib/posts'

export async function GET() {
  try {
    const posts = await listPortfolioPosts(false)
    return NextResponse.json({ success: true, posts })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch portfolio posts',
      },
      { status: 500 }
    )
  }
}

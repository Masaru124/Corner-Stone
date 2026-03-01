import { neon } from '@neondatabase/serverless'

export type PortfolioPost = {
  id: number
  title: string
  type: string
  description: string
  images: string[]
  tags: string[]
  hidden: boolean
  image_fit: 'contain' | 'cover'
  image_size: 'small' | 'medium' | 'large'
  image_columns: number | null
  created_at: string
}

type CreatePortfolioPostInput = {
  title: string
  type: string
  description: string
  images: string[]
  tags: string[]
  imageFit?: 'contain' | 'cover'
  imageSize?: 'small' | 'medium' | 'large'
  imageColumns?: number | null
}

type UpdatePortfolioPostInput = {
  title?: string
  type?: string
  description?: string
  tags?: string[]
  images?: string[]
  hidden?: boolean
  imageFit?: 'contain' | 'cover'
  imageSize?: 'small' | 'medium' | 'large'
  imageColumns?: number | null
}

let ensurePostsTablePromise: Promise<void> | null = null

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured')
  }

  return neon(databaseUrl)
}

async function ensurePortfolioPostsTable() {
  if (ensurePostsTablePromise) {
    return ensurePostsTablePromise
  }

  ensurePostsTablePromise = (async () => {
    const sql = getSqlClient()
    await sql`
      CREATE TABLE IF NOT EXISTS portfolio_posts (
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        type TEXT NOT NULL,
        description TEXT NOT NULL,
        images TEXT[] NOT NULL DEFAULT '{}',
        tags TEXT[] NOT NULL DEFAULT '{}',
        hidden BOOLEAN NOT NULL DEFAULT FALSE,
        image_fit TEXT NOT NULL DEFAULT 'contain',
        image_size TEXT NOT NULL DEFAULT 'medium',
        image_columns INTEGER,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `

    await sql`
      ALTER TABLE portfolio_posts
      ADD COLUMN IF NOT EXISTS image_fit TEXT NOT NULL DEFAULT 'contain'
    `

    await sql`
      ALTER TABLE portfolio_posts
      ADD COLUMN IF NOT EXISTS image_size TEXT NOT NULL DEFAULT 'medium'
    `

    await sql`
      ALTER TABLE portfolio_posts
      ADD COLUMN IF NOT EXISTS image_columns INTEGER
    `
  })()

  return ensurePostsTablePromise
}

export async function listPortfolioPosts(includeHidden: boolean): Promise<PortfolioPost[]> {
  await ensurePortfolioPostsTable()
  const sql = getSqlClient()

  if (includeHidden) {
    const result = await sql`
      SELECT id, title, type, description, images, tags, hidden, image_fit, image_size, image_columns, created_at
      FROM portfolio_posts
      ORDER BY created_at DESC
    `

    return result as PortfolioPost[]
  }

  const result = await sql`
    SELECT id, title, type, description, images, tags, hidden, image_fit, image_size, image_columns, created_at
    FROM portfolio_posts
    WHERE hidden = FALSE
    ORDER BY created_at DESC
  `

  return result as PortfolioPost[]
}

export async function createPortfolioPost(input: CreatePortfolioPostInput): Promise<PortfolioPost> {
  await ensurePortfolioPostsTable()
  const sql = getSqlClient()

  const imageFit = input.imageFit ?? 'contain'
  const imageSize = input.imageSize ?? 'medium'
  const imageColumns = typeof input.imageColumns === 'number' ? input.imageColumns : null

  const result = (await sql`
    INSERT INTO portfolio_posts (title, type, description, images, tags, image_fit, image_size, image_columns)
    VALUES (${input.title}, ${input.type}, ${input.description}, ${input.images}, ${input.tags}, ${imageFit}, ${imageSize}, ${imageColumns})
    RETURNING id, title, type, description, images, tags, hidden, image_fit, image_size, image_columns, created_at
  `) as PortfolioPost[]

  if (!result[0]) {
    throw new Error('Failed to create post')
  }

  return result[0]
}

export async function updatePortfolioPost(id: number, input: UpdatePortfolioPostInput): Promise<PortfolioPost | null> {
  await ensurePortfolioPostsTable()
  const sql = getSqlClient()

  const title = typeof input.title === 'string' ? input.title : null
  const type = typeof input.type === 'string' ? input.type : null
  const description = typeof input.description === 'string' ? input.description : null
  const hasTags = Array.isArray(input.tags)
  const tags = hasTags ? input.tags || [] : []
  const hasImages = Array.isArray(input.images)
  const images = hasImages ? input.images || [] : []
  const hidden = typeof input.hidden === 'boolean' ? input.hidden : null
  const imageFit = input.imageFit ?? null
  const imageSize = input.imageSize ?? null
  const imageColumns = typeof input.imageColumns === 'number' ? input.imageColumns : input.imageColumns === null ? null : undefined

  const safeImageColumns = imageColumns === undefined ? undefined : imageColumns

  const result = (await sql`
    UPDATE portfolio_posts
    SET
      title = COALESCE(${title}, title),
      type = COALESCE(${type}, type),
      description = COALESCE(${description}, description),
      tags = CASE
        WHEN ${hasTags} THEN ${tags}
        ELSE tags
      END,
      images = CASE
        WHEN ${hasImages} THEN ${images}
        ELSE images
      END,
      hidden = COALESCE(${hidden}, hidden),
      image_fit = COALESCE(${imageFit}, image_fit),
      image_size = COALESCE(${imageSize}, image_size),
      image_columns = CASE
        WHEN ${safeImageColumns === undefined} THEN image_columns
        ELSE ${safeImageColumns ?? null}
      END
    WHERE id = ${id}
    RETURNING id, title, type, description, images, tags, hidden, image_fit, image_size, image_columns, created_at
  `) as PortfolioPost[]

  return result[0] ?? null
}

export async function deletePortfolioPost(id: number): Promise<boolean> {
  await ensurePortfolioPostsTable()
  const sql = getSqlClient()
  const result = (await sql`
    DELETE FROM portfolio_posts
    WHERE id = ${id}
    RETURNING id
  `) as Array<{ id: number }>

  return Boolean(result[0])
}

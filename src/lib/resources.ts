import { neon } from '@neondatabase/serverless'

export type Resource = {
  id: number
  title: string
  slug: string
  description: string
  content: string
  category: string
  read_time: string
  image_url: string | null
  featured: boolean
  hidden: boolean
  created_at: string
  updated_at: string
}

type CreateResourceInput = {
  title: string
  slug: string
  description: string
  content: string
  category: string
  readTime: string
  imageUrl?: string | null
  featured?: boolean
}

type UpdateResourceInput = {
  title?: string
  slug?: string
  description?: string
  content?: string
  category?: string
  readTime?: string
  imageUrl?: string | null
  featured?: boolean
  hidden?: boolean
}

let ensureResourcesTablePromise: Promise<void> | null = null

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured')
  }

  return neon(databaseUrl)
}

async function ensureResourcesTable() {
  if (ensureResourcesTablePromise) {
    return ensureResourcesTablePromise
  }

  ensureResourcesTablePromise = (async () => {
    const sql = getSqlClient()
    await sql`
      CREATE TABLE IF NOT EXISTS resources (
        id BIGSERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT NOT NULL,
        read_time TEXT NOT NULL,
        image_url TEXT,
        featured BOOLEAN NOT NULL DEFAULT FALSE,
        hidden BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `
  })()

  return ensureResourcesTablePromise
}

export async function listResources(includeHidden: boolean): Promise<Resource[]> {
  await ensureResourcesTable()
  const sql = getSqlClient()

  if (includeHidden) {
    const result = await sql`
      SELECT id, title, slug, description, content, category, read_time, image_url, featured, hidden, created_at, updated_at
      FROM resources
      ORDER BY featured DESC, created_at DESC
    `
    return result as Resource[]
  }

  const result = await sql`
    SELECT id, title, slug, description, content, category, read_time, image_url, featured, hidden, created_at, updated_at
    FROM resources
    WHERE hidden = FALSE
    ORDER BY featured DESC, created_at DESC
  `
  return result as Resource[]
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  await ensureResourcesTable()
  const sql = getSqlClient()

  const result = await sql`
    SELECT id, title, slug, description, content, category, read_time, image_url, featured, hidden, created_at, updated_at
    FROM resources
    WHERE slug = ${slug} AND hidden = FALSE
  `

  return (result[0] as Resource) ?? null
}

export async function getResourceById(id: number): Promise<Resource | null> {
  await ensureResourcesTable()
  const sql = getSqlClient()

  const result = await sql`
    SELECT id, title, slug, description, content, category, read_time, image_url, featured, hidden, created_at, updated_at
    FROM resources
    WHERE id = ${id}
  `

  return (result[0] as Resource) ?? null
}

export async function createResource(input: CreateResourceInput): Promise<Resource> {
  await ensureResourcesTable()
  const sql = getSqlClient()

  const result = (await sql`
    INSERT INTO resources (title, slug, description, content, category, read_time, image_url, featured)
    VALUES (${input.title}, ${input.slug}, ${input.description}, ${input.content}, ${input.category}, ${input.readTime}, ${input.imageUrl ?? null}, ${input.featured ?? false})
    RETURNING id, title, slug, description, content, category, read_time, image_url, featured, hidden, created_at, updated_at
  `) as Resource[]

  if (!result[0]) {
    throw new Error('Failed to create resource')
  }

  return result[0]
}

export async function updateResource(id: number, input: UpdateResourceInput): Promise<Resource | null> {
  await ensureResourcesTable()
  const sql = getSqlClient()

  const title = typeof input.title === 'string' ? input.title : null
  const slug = typeof input.slug === 'string' ? input.slug : null
  const description = typeof input.description === 'string' ? input.description : null
  const content = typeof input.content === 'string' ? input.content : null
  const category = typeof input.category === 'string' ? input.category : null
  const readTime = typeof input.readTime === 'string' ? input.readTime : null
  const imageUrl = input.imageUrl === null || typeof input.imageUrl === 'string' ? input.imageUrl : undefined
  const featured = typeof input.featured === 'boolean' ? input.featured : null
  const hidden = typeof input.hidden === 'boolean' ? input.hidden : null

  const result = (await sql`
    UPDATE resources
    SET
      title = COALESCE(${title}, title),
      slug = COALESCE(${slug}, slug),
      description = COALESCE(${description}, description),
      content = COALESCE(${content}, content),
      category = COALESCE(${category}, category),
      read_time = COALESCE(${readTime}, read_time),
      image_url = COALESCE(${imageUrl}, image_url),
      featured = COALESCE(${featured}, featured),
      hidden = COALESCE(${hidden}, hidden),
      updated_at = NOW()
    WHERE id = ${id}
    RETURNING id, title, slug, description, content, category, read_time, image_url, featured, hidden, created_at, updated_at
  `) as Resource[]

  return result[0] ?? null
}

export async function deleteResource(id: number): Promise<boolean> {
  await ensureResourcesTable()
  const sql = getSqlClient()

  const result = (await sql`
    DELETE FROM resources
    WHERE id = ${id}
    RETURNING id
  `) as Array<{ id: number }>

  return Boolean(result[0])
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

import { neon } from '@neondatabase/serverless'

export type MediaUpload = {
  id: number
  public_id: string
  secure_url: string
  resource_type: 'image' | 'video'
  format: string | null
  bytes: number | null
  width: number | null
  height: number | null
  duration: number | null
  created_at: string
}

type InsertMediaUploadInput = {
  publicId: string
  secureUrl: string
  resourceType: 'image' | 'video'
  format?: string | null
  bytes?: number | null
  width?: number | null
  height?: number | null
  duration?: number | null
}

let ensureTablePromise: Promise<void> | null = null

function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured')
  }

  return neon(databaseUrl)
}

async function ensureMediaUploadsTable() {
  if (ensureTablePromise) {
    return ensureTablePromise
  }

  ensureTablePromise = (async () => {
    const sql = getSqlClient()
    await sql`
      CREATE TABLE IF NOT EXISTS media_uploads (
        id BIGSERIAL PRIMARY KEY,
        public_id TEXT UNIQUE NOT NULL,
        secure_url TEXT NOT NULL,
        resource_type TEXT NOT NULL,
        format TEXT,
        bytes INTEGER,
        width INTEGER,
        height INTEGER,
        duration DOUBLE PRECISION,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      )
    `
  })()

  return ensureTablePromise
}

export async function listMediaUploads(): Promise<MediaUpload[]> {
  await ensureMediaUploadsTable()
  const sql = getSqlClient()

  return sql<MediaUpload[]>`
    SELECT
      id,
      public_id,
      secure_url,
      resource_type,
      format,
      bytes,
      width,
      height,
      duration,
      created_at
    FROM media_uploads
    ORDER BY created_at DESC
  `
}

export async function insertMediaUpload(input: InsertMediaUploadInput) {
  await ensureMediaUploadsTable()
  const sql = getSqlClient()

  const result = await sql<MediaUpload[]>`
    INSERT INTO media_uploads (
      public_id,
      secure_url,
      resource_type,
      format,
      bytes,
      width,
      height,
      duration
    ) VALUES (
      ${input.publicId},
      ${input.secureUrl},
      ${input.resourceType},
      ${input.format ?? null},
      ${input.bytes ?? null},
      ${input.width ?? null},
      ${input.height ?? null},
      ${input.duration ?? null}
    )
    ON CONFLICT (public_id) DO NOTHING
    RETURNING
      id,
      public_id,
      secure_url,
      resource_type,
      format,
      bytes,
      width,
      height,
      duration,
      created_at
  `

  return result[0] ?? null
}

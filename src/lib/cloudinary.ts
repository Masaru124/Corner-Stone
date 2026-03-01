import { v2 as cloudinary } from 'cloudinary'

let cloudinaryConfigured = false

type CloudinaryConfig = {
  cloudName: string
  apiKey: string
  apiSecret: string
}

function sanitizeEnvValue(value: string | undefined) {
  if (!value) {
    return ''
  }

  return value.trim().replace(/^['\"]|['\"]$/g, '')
}

function getCloudinaryConfigFromUrl(): CloudinaryConfig | null {
  const cloudinaryUrl = sanitizeEnvValue(process.env.CLOUDINARY_URL)
  if (!cloudinaryUrl) {
    return null
  }

  try {
    const parsedUrl = new URL(cloudinaryUrl)
    if (parsedUrl.protocol !== 'cloudinary:') {
      return null
    }

    const apiKey = decodeURIComponent(parsedUrl.username || '')
    const apiSecret = decodeURIComponent(parsedUrl.password || '')
    const cloudName = parsedUrl.hostname || ''

    if (!cloudName || !apiKey || !apiSecret) {
      return null
    }

    return { cloudName, apiKey, apiSecret }
  } catch {
    return null
  }
}

function getCloudinaryConfig(): CloudinaryConfig {
  const fromUrl = getCloudinaryConfigFromUrl()
  if (fromUrl) {
    return fromUrl
  }

  const cloudName = sanitizeEnvValue(process.env.CLOUDINARY_CLOUD_NAME)
  const apiKey = sanitizeEnvValue(process.env.CLOUDINARY_API_KEY)
  const apiSecret = sanitizeEnvValue(process.env.CLOUDINARY_API_SECRET)

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error('Cloudinary environment variables are not fully configured. Set CLOUDINARY_URL or CLOUDINARY_CLOUD_NAME/CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET.')
  }

  if (cloudName.toLowerCase() === 'root') {
    throw new Error('CLOUDINARY_CLOUD_NAME is set to "Root", which is invalid. Use your real Cloudinary cloud name from the Cloudinary dashboard.')
  }

  return { cloudName, apiKey, apiSecret }
}

function ensureCloudinaryConfigured() {
  if (cloudinaryConfigured) {
    return
  }

  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig()

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  })

  cloudinaryConfigured = true
}

export function createCloudinaryUploadSignature(folder: string, timestamp: number) {
  ensureCloudinaryConfigured()
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig()

  const signature = cloudinary.utils.api_sign_request(
    {
      folder,
      timestamp,
    },
    apiSecret
  )

  return {
    cloudName,
    apiKey,
    timestamp,
    signature,
    folder,
  }
}

type UploadImageInput = {
  fileBuffer: Buffer
  folder: string
}

type UploadImageResult = {
  publicId: string
  secureUrl: string
  width: number | null
  height: number | null
  format: string | null
  bytes: number | null
}

export async function uploadImageToCloudinary(input: UploadImageInput): Promise<UploadImageResult> {
  ensureCloudinaryConfigured()

  const result = await new Promise<{
    public_id?: string
    secure_url?: string
    width?: number
    height?: number
    format?: string
    bytes?: number
  }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: input.folder,
        resource_type: 'image',
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error || new Error('Cloudinary upload failed'))
          return
        }

        resolve(uploadResult)
      }
    )

    stream.end(input.fileBuffer)
  })

  return {
    publicId: result.public_id || '',
    secureUrl: result.secure_url || '',
    width: typeof result.width === 'number' ? result.width : null,
    height: typeof result.height === 'number' ? result.height : null,
    format: result.format || null,
    bytes: typeof result.bytes === 'number' ? result.bytes : null,
  }
}

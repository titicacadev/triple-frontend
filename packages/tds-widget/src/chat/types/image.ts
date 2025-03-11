export interface CloudinaryImageInterface {
  public_id: string
  version: number
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags: any[]
  bytes: number
  type: string
  etag: string
  placeholder: boolean
  url: string
  secure_url: string
  backup_url: string
  original_filename: string
}

/**
 * TODO: type-definitions의 ImageMeta와 연관성 조사
 */
export interface MetaDataInterface {
  cloudinaryBucket: string
  cloudinaryId: string
  originalUrl?: string
  fileName?: string
  id: string
  type: string
  sizes: {
    full: {
      url: string
    }
    large: {
      url: string
    }
    smallSquare: {
      url: string
    }
  }
  width: number
  height: number
}

export interface TokenInterface {
  signature: string
  public_id: string
  api_key: string
  timestamp: string
}

interface ImageURL {
  url: string
}

export interface ImageMeta {
  id: string
  title: string | null
  description: string | null
  sourceUrl: string
  sizes: {
    full: ImageURL
    large: ImageURL
    // eslint-disable-next-line @typescript-eslint/camelcase
    small_square?: ImageURL
    smallSquare?: ImageURL
  }
  attachmentId?: string
}

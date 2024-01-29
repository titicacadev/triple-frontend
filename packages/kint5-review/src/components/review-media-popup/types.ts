import { ImageMeta } from '@titicaca/type-definitions'

export interface ReviewMedia extends ImageMeta {
  metadata: {
    duration?: number
    bitRate?: number
    format?: string
  }
}

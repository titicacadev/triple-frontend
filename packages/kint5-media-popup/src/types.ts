import { ImageMeta } from '@titicaca/type-definitions'

export interface MediumMeta extends ImageMeta {
  metadata?: {
    duration?: number
    bitRate?: number
    format?: string
  }
}

import { GlobalSizes, ImageMeta } from '@titicaca/type-definitions'

export interface CarouselImageMeta extends ImageMeta {
  size?: GlobalSizes
}

export interface RendererParams {
  currentIndex: number
  totalCount: number
}

export interface CarouselImageMeta {
  /**
   * Format: uuid
   * @description 이미지 ID 정보
   */
  id: string
  /** @description 대표이미지 여부 */
  heroImage: boolean
  /** @description 이미지 설명 */
  caption?: string
  url: {
    /** @description 이미지(2048x2048) URL */
    full: string
    /** @description 이미지(1024x1024) URL */
    large: string
    /** @description 이미지(256x256) URL */
    smallSquare: string
    /** @description 이미지(원본크기) URL */
    original: string
  }
}

export interface RendererParams {
  currentIndex: number
  totalCount: number
}

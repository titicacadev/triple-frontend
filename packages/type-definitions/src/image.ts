interface ImageURL {
  url: string
}

interface CamelSmallSquare {
  smallSquare: ImageURL
}

interface SnakeSmallSquare {
  // eslint-disable-next-line @typescript-eslint/camelcase
  small_square: ImageURL
}

type SmallSquare = CamelSmallSquare | SnakeSmallSquare

export interface ImageMeta {
  id: string
  title: string | null
  description: string | null
  sourceUrl: string
  sizes: {
    full: ImageURL
    large: ImageURL
  } & SmallSquare
}

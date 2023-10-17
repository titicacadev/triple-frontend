import { ImageMeta } from '@titicaca/type-definitions'

export function compareMedia(a: ImageMeta, b: ImageMeta) {
  if (a.type === b.type) {
    return 0
  }

  if (a.type === 'video') {
    return -1
  }

  return 1
}

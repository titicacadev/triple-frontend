import { ImageMeta } from '@titicaca/type-definitions'

import MultipleImages from './multiple-images'
import PentaImages from './penta-images'
import SingleImage from './single-image'

export default function Images({ images }: { images: ImageMeta[] }) {
  if (images.length <= 0) {
    return null
  }

  if (images.length >= 5) {
    return <PentaImages images={images} />
  }

  if (images.length > 1) {
    return <MultipleImages images={images} />
  }

  return <SingleImage image={images[0]} />
}

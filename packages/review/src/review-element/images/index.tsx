import { ImageMeta } from '@titicaca/type-definitions'

import MultipleImages from './multiple-images'
import PentaImages from './penta-images'
import SingleImage from './single-image'

export default function Images({
  images,
  onImageClick,
}: {
  images: ImageMeta[]
  onImageClick: (e: React.SyntheticEvent, index: number) => void
}) {
  if (images.length <= 0) {
    return null
  }

  if (images.length >= 5) {
    return <PentaImages images={images} onImageClick={onImageClick} />
  }

  if (images.length > 1) {
    return <MultipleImages images={images} onImageClick={onImageClick} />
  }

  return <SingleImage image={images[0]} onImageClick={onImageClick} />
}

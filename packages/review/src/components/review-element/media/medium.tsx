import { ImageMeta } from '@titicaca/type-definitions'

import Image from './image'
import Video from './video'

interface Props {
  medium: ImageMeta
  index: number
}

function Medium({ medium, index }: Props) {
  const isVideo = medium.type === 'video'

  if (isVideo) {
    return <Video medium={medium} autoPlay={index === 0} />
  }

  return <Image medium={medium} />
}

export default Medium

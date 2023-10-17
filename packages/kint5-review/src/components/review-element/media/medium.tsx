import { ImageMeta } from '@titicaca/type-definitions'

import Image from './image'
import Video from './video'

interface Props {
  medium: ImageMeta
}

function Medium({ medium }: Props) {
  const isVideo = medium.type === 'video'

  if (isVideo) {
    return <Video medium={medium} />
  }

  return <Image medium={medium} />
}

export default Medium

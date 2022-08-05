import { ImageMeta } from '@titicaca/type-definitions'
import { useMemo } from 'react'

import { compareMedia } from './compare-media'
import { Dimmer, MediumWrapper } from './elements'
import MediaWrapper from './media-wrapper'
import Medium from './medium'

interface Props {
  media: ImageMeta[]
}

function Media({ media }: Props) {
  const hasVideo = media.some((medium) => medium.type === 'video')

  const sortedMedia = useMemo(
    () => (hasVideo ? [...media].sort(compareMedia) : media),
    [media, hasVideo],
  )

  const limit = hasVideo ? 3 : 5
  const length = Math.min(sortedMedia.length, limit)
  const restLength = sortedMedia.length - length

  if (sortedMedia.length === 0) {
    return null
  }

  return (
    <MediaWrapper length={length}>
      {sortedMedia.slice(0, limit).map((medium, index) => (
        <MediumWrapper key={medium.id}>
          <Medium medium={medium} />
          {restLength > 0 && index === limit - 1 ? (
            <Dimmer
              flex
              alignItems="center"
              justifyContent="center"
              backgroundColor="gray500"
            >
              + {restLength}
            </Dimmer>
          ) : null}
        </MediumWrapper>
      ))}
    </MediaWrapper>
  )
}

export default Media

import styled from 'styled-components'
import { Container, Text } from '@titicaca/kint5-core-elements'

import { ReviewMedia } from './types'

interface ReviewMediaGridProps {
  media: ReviewMedia[]
  onMediaClick: (clickedMediaIndex: number) => void
}

const ReviewMediaGridContainer = styled(Container)`
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1px;
`

const VideoThumbnailFilter = styled(Container)`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.6) 90%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 1;
`

const VideoDuration = styled(Text)`
  position: absolute;
  bottom: 8px;
  right: 9px;
  z-index: 2;
  font-weight: 400;
`

const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const MAX_WIDTH_PX = 768

export function ReviewMediaGrid({ media, onMediaClick }: ReviewMediaGridProps) {
  return (
    <ReviewMediaGridContainer
      display="grid"
      css={{
        maxWidth: MAX_WIDTH_PX,
        margin: '0 auto',
      }}
    >
      {media.map(({ id, sizes, type, metadata }, index) => (
        <Container
          key={id}
          position="relative"
          css={{
            height: '50vw',
            maxHeight: MAX_WIDTH_PX / 2,
          }}
          as="button"
          aria-label="리뷰 미디어 보기"
        >
          <MediaImage
            src={sizes.large.url}
            onClick={() => onMediaClick(index)}
            alt=""
          />
          {type === 'video' ? (
            <>
              <VideoThumbnailFilter
                position="absolute"
                css={{
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                }}
                onClick={() => onMediaClick(index)}
              />
              {metadata.duration ? (
                <VideoDuration size={14} color="white">
                  {formatDuration(Math.round(metadata.duration))}
                </VideoDuration>
              ) : null}
            </>
          ) : null}
        </Container>
      ))}
    </ReviewMediaGridContainer>
  )
}

function formatDuration(durationInSeconds: number) {
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = durationInSeconds % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

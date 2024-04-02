import styled from 'styled-components'
import { Container, Text } from '@titicaca/kint5-core-elements'

import { MediumMeta } from './types'

interface GridViewProps {
  media: MediumMeta[]
  onMediumClick: (selectedMediumIndex: number) => void
}

const MAX_WIDTH_PX = 768

const VideoThumbnailFilter = styled.div`
  position: absolute;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.6) 90%,
    rgba(0, 0, 0, 0.7) 100%
  );
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export function GridView({ media, onMediumClick }: GridViewProps) {
  return (
    <Container
      display="grid"
      css={{
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridGap: '1px',
        maxWidth: MAX_WIDTH_PX,
        margin: '0 auto',
      }}
    >
      {media.map(({ id, type, sizes, title, description, metadata }, index) => (
        <Container
          key={id}
          position="relative"
          css={{
            height: '50vw',
            maxHeight: MAX_WIDTH_PX / 2,
          }}
          as="button"
        >
          <img
            role="presentation"
            src={sizes.large.url}
            onClick={() => onMediumClick(index)}
            onKeyDown={() => onMediumClick(index)}
            alt={title || description || ''}
            css={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {type === 'video' ? (
            <>
              <VideoThumbnailFilter
                onClick={() => onMediumClick(index)}
                onKeyDown={() => onMediumClick(index)}
              />
              {metadata.duration ? (
                <Text
                  css={{
                    position: 'absolute',
                    bottom: 8,
                    right: 9,
                    zIndex: 2,
                    color: 'var(--color-kint5-gray0)',
                  }}
                >
                  {formatDuration(Math.round(metadata.duration))}
                </Text>
              ) : null}
            </>
          ) : null}
        </Container>
      ))}
    </Container>
  )
}

function formatDuration(durationInSeconds: number) {
  const minutes = Math.floor(durationInSeconds / 60)
  const seconds = durationInSeconds % 60

  return `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`
}

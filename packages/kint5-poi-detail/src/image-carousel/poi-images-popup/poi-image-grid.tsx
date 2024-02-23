import styled from 'styled-components'
import { Container } from '@titicaca/kint5-core-elements'
import { CarouselImageMeta } from '@titicaca/image-carousel'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

interface PoiMediaGridProps {
  images: CarouselImageMeta[]
  onMediaClick: (clickedMediaIndex: number) => void
  onFetchMoreImages: () => void
}

const ReviewMediaGridContainer = styled(Container)`
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1px;
`

const MediaImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const MAX_WIDTH_PX = 768

export function PoiImageGrid({
  images,
  onMediaClick,
  onFetchMoreImages,
}: PoiMediaGridProps) {
  const app = useTripleClientMetadata()

  const handleOnIntersect: StaticIntersectionObserver['props']['onChange'] = ({
    isIntersecting,
  }) => {
    if (!isIntersecting || !app) {
      return
    }

    onFetchMoreImages()
  }

  return (
    <>
      <ReviewMediaGridContainer
        display="grid"
        css={{
          maxWidth: MAX_WIDTH_PX,
          margin: '0 auto',
        }}
      >
        {images.map(({ id, sizes }, index) => (
          <Container
            key={id}
            position="relative"
            css={{
              height: '50vw',
              maxHeight: MAX_WIDTH_PX / 2,
            }}
            as="button"
          >
            <MediaImage
              src={sizes.large.url}
              onClick={() => onMediaClick(index)}
              alt=""
            />
          </Container>
        ))}
      </ReviewMediaGridContainer>
      <StaticIntersectionObserver onChange={handleOnIntersect}>
        <div css={{ height: 1 }} />
      </StaticIntersectionObserver>
    </>
  )
}

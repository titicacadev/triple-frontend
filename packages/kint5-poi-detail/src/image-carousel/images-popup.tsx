import ImageCarousel, { CarouselImageMeta } from '@titicaca/image-carousel'
import { Container, Navbar, StickyHeader } from '@titicaca/kint5-core-elements'
import Popup from '@titicaca/popup'

type ImagesPopupProps = Parameters<typeof ImageCarousel>[0] & {
  open: boolean
  images: CarouselImageMeta[]
  onClose: () => void
}

export function ImagesPopup({
  open,
  images,
  onClose,
  ...imageCarouselProps
}: ImagesPopupProps) {
  return (
    <Popup open={open} onClose={onClose} noNavbar>
      <StickyHeader>
        <Navbar onLeftButtonClick={onClose} leftButtonIconType="close" />
      </StickyHeader>
      <Container
        css={{
          position: 'absolute',
          top: '50%',
          left: 0,
          transform: 'translateY(-50%)',
          width: '100%',
        }}
      >
        <ImageCarousel images={images} {...imageCarouselProps} />
      </Container>
    </Popup>
  )
}

import { MouseEvent, TouchEvent, useState } from 'react'
import styled, { css } from 'styled-components'
import {
  CaretLeftIcon,
  CaretRightIcon,
  Container,
  FlexBox,
} from '@titicaca/kint5-core-elements'
import { useUserAgentContext } from '@titicaca/react-contexts'
import { useTripleClientMetadata } from '@titicaca/react-triple-client-interfaces'

import { ReviewMedia } from './types'

interface CarouselProps {
  currentMediaIndex: number
  media: ReviewMedia[]
  onSlide: (mediaIndex: number) => void
}

const CarouselContainer = styled(Container)`
  overflow: hidden;
`

const CarouselItemWrapper = styled(FlexBox)<{
  currentMediaIndex: number
}>`
  transition: transform 200ms ease-in-out;
  transform: translateX(
    calc(-${({ currentMediaIndex }) => currentMediaIndex} * 100%)
  );
`

const Img = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`

const Video = styled.video`
  width: 100%;
  height: auto;
  object-fit: contain;
`

const slideButtonMixin = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  & > img {
    position: absolute;
    top: 8px;
  }
`

const LeftButton = styled.button`
  ${slideButtonMixin};
  left: 3px;
  padding-right: 3px;
`

const RightButton = styled.button`
  ${slideButtonMixin};
  right: 3px;
  padding-left: 3px;
`

export function ReviewMediaCarousel({
  currentMediaIndex,
  media,
  onSlide,
}: CarouselProps) {
  const app = useTripleClientMetadata()
  const { isMobile } = useUserAgentContext()
  const [startX, setStartX] = useState(0)
  const [dragX, setDragX] = useState(0)

  const isDesktop = !app && !isMobile

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setStartX(event.touches[0].clientX)
  }

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setStartX(event.clientX)
  }

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    setDragX(event.touches[0].clientX - startX)
  }

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (event.buttons !== 1) {
      return
    }

    setDragX(event.clientX - startX)
  }

  const handleDragEnd = () => {
    if (dragX > 15 && currentMediaIndex > 0) {
      onSlide(currentMediaIndex - 1)
    } else if (dragX < -15 && currentMediaIndex < media.length - 1) {
      onSlide(currentMediaIndex + 1)
    }

    setStartX(0)
    setDragX(0)
  }

  return (
    <CarouselContainer
      position="relative"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseUp={handleDragEnd}
      onTouchEnd={handleDragEnd}
      css={{
        width: '100%',
        height: `calc(100% - 44px)`,
        maxWidth: 768,
        margin: '0 auto',
      }}
    >
      {isDesktop && currentMediaIndex > 0 ? (
        <LeftButton onClick={() => onSlide(currentMediaIndex - 1)}>
          <CaretLeftIcon color="#FFF" />
        </LeftButton>
      ) : null}
      {isDesktop && currentMediaIndex < media.length - 1 ? (
        <RightButton onClick={() => onSlide(currentMediaIndex + 1)}>
          <CaretRightIcon color="#FFF" />
        </RightButton>
      ) : null}
      <CarouselItemWrapper
        flex
        alignItems="center"
        css={{ width: '100%', height: '100%' }}
        currentMediaIndex={currentMediaIndex}
      >
        {media.map((media) => (
          <FlexBox
            key={media.id}
            flex
            flexBasis="100%"
            flexGrow={0}
            flexShrink={0}
            css={{
              width: '100%',
              height: '100%',
            }}
            role="none presentation"
          >
            {media.type === 'image' ? (
              <Img src={media.sizes.large.url} draggable={false} alt="" />
            ) : (
              <Video
                src={media.video?.large.url}
                autoPlay
                loop
                muted
                playsInline
                controls={false}
              />
            )}
          </FlexBox>
        ))}
      </CarouselItemWrapper>
    </CarouselContainer>
  )
}

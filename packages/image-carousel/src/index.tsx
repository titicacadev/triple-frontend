import * as React from 'react'
import styled from 'styled-components'
import { FlickingOptions, FlickingEvent } from '@egjs/flicking'
import Carousel, { CarouselProps } from './carousel'
import {
  Image,
  MarginPadding,
  GlobalSizes,
} from '@titicaca/triple-design-system'

const PageLabelText = styled.div`
  font-size: 12px;
  font-weight: bold;
`

const PageLabelContainer = styled.div`
  margin: 10px;
  padding: 5px 7px;
  color: #ffffff;
  border-radius: 12px;
  background-color: rgba(0, 0, 0, 0.2);
`

interface ImagePagerProps extends Partial<CarouselProps> {
  size: GlobalSizes
  frame: GlobalSizes
  images: any[]
  totalPageCount: number
  onImageClick: (e?: React.SyntheticEvent, image?: any) => void
  ImageSource: any
  lastPageOverlayContent: React.ReactNode
  showMoreComponent: (index: number) => React.ReactNode | React.ReactNode
}

export function ImageCarousel({
  margin,
  borderRadius,
  size: globalSize,
  frame: globalFrame,
  images,
  defaultIndex = 0,
  totalPageCount,
  onImageClick,
  onMoveStart,
  onMove,
  onMoveEnd,
  ImageSource,
  lastPageOverlayContent,
  showMoreComponent,
}: Partial<ImagePagerProps>) {
  return (
    <Carousel
      margin={margin}
      borderRadius={borderRadius}
      defaultIndex={defaultIndex}
      onMoveStart={onMoveStart}
      onMove={onMove}
      onMoveEnd={onMoveEnd}
      totalCount={totalPageCount || images.length}
      pageLabelComponent={({ currentIndex }: any) => (
        <PageLabel
          current={currentIndex}
          total={totalPageCount || images.length}
        />
      )}
      showMoreComponentHandler={(function() {
        if (typeof showMoreComponent !== 'function') {
          return function(index?: number) {
            return showMoreComponent
          }
        } else {
          return showMoreComponent
        }
      })()}
    >
      {images.map((image, i) => {
        const { frame: imageFrame, size: imageSize, sizes, sourceUrl } = image
        const size = globalSize || imageSize
        const frame = size ? undefined : globalFrame || imageFrame

        return (
          <Image
            key={i}
            src={sizes.large.url}
            sourceUrl={sourceUrl}
            size={size}
            frame={frame}
            ImageSource={ImageSource}
            borderRadius={0}
            onClick={onImageClick && ((e) => onImageClick(e, image))}
            overlay={
              typeof showMoreComponent === 'function'
                ? showMoreComponent(i)
                : showMoreComponent
            }
            overlayType="dark"
          />
        )
      })}
    </Carousel>
  )
}

function PageLabel({ current, total }: { current: number; total: number }) {
  return (
    <PageLabelContainer>
      <PageLabelText>{`${current + 1} / ${total}`}</PageLabelText>
    </PageLabelContainer>
  )
}

export default ImageCarousel

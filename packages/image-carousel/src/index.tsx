import * as React from 'react'
import styled from 'styled-components'
import { FlickingEvent } from '@egjs/flicking'
import Flicking from './flicking'
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

function PageLabel({ current, total }: { current: number; total: number }) {
  return (
    <PageLabelContainer>
      <PageLabelText>{`${current + 1} / ${total}`}</PageLabelText>
    </PageLabelContainer>
  )
}

interface ImagePagerProps {
  margin?: MarginPadding
  borderRadius?: number
  currentPage?: number
  size?: GlobalSizes
  frame?: GlobalSizes
  images?: any[]
  totalPageCount?: number
  onImageClick?: (e?: React.SyntheticEvent, image?: any) => void
  onBeforePageChange?: (e?: FlickingEvent) => void
  onPageMove?: (e?: FlickingEvent) => void
  onPageChange?: (e?: FlickingEvent) => void
  ImageSource?: any
  lastPageOverlayContent?: React.ReactNode
}

export class ImagePager extends React.PureComponent<ImagePagerProps> {
  render() {
    const {
      margin,
      borderRadius,
      size: globalSize,
      frame: globalFrame,
      images,
      currentPage,
      totalPageCount,
      onImageClick,
      onBeforePageChange,
      onPageMove,
      onPageChange,
      ImageSource,
      lastPageOverlayContent,
    } = this.props

    return (
      <Flicking
        margin={margin}
        borderRadius={borderRadius}
        currentPage={currentPage}
        onBeforePageChange={onBeforePageChange}
        onPageMove={onPageMove}
        onPageChange={onPageChange}
        totalCount={totalPageCount || images.length}
        pageLabelComponent={({ currentSlide }: any) => (
          <PageLabel
            current={currentSlide}
            total={totalPageCount || images.length}
          />
        )}
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
                (i === images.length - 1 && lastPageOverlayContent) || null
              }
              overlayType="dark"
            />
          )
        })}
      </Flicking>
    )
  }
}

export default ImagePager

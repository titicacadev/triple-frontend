import * as React from 'react'
import styled from 'styled-components'
import {
  Image,
  GlobalSizes,
  FrameRatioAndSizes,
  ImageSourceType,
} from '@titicaca/core-elements'

import Carousel, { CarouselProps } from './carousel'

interface ImageEntity {
  frame?: FrameRatioAndSizes
  size?: GlobalSizes
  sizes: {
    large: { url: string }
  }
  sourceUrl?: string
  title?: string | null
  description?: string | null
}

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

export interface RendererProps {
  currentIndex: number
  totalCount: number
}

interface ImageCarouselProps extends Omit<CarouselProps, 'pageLabelRenderer'> {
  images: ImageEntity[]
  size?: GlobalSizes
  frame?: FrameRatioAndSizes
  ImageSource?: ImageSourceType
  onImageClick?: (e?: React.SyntheticEvent, image?: ImageEntity) => void
  showMoreRenderer?: (params: RendererProps) => React.ReactNode
  pageLabelRenderer?: (params: RendererProps) => React.ReactNode
  displayedTotalCount?: number
}

export default class ImageCarousel extends React.PureComponent<
  ImageCarouselProps
> {
  static defaultProps: Partial<ImageCarousel['props']> = {
    pageLabelRenderer: (props) => PageLabel(props),
  }

  get carouselProps(): CarouselProps {
    const {
      margin,
      borderRadius,
      defaultIndex,
      images,
      onMoveStart,
      onMove,
      onMoveEnd,
      pageLabelRenderer,
      displayedTotalCount,
    } = this.props

    const totalCount = displayedTotalCount ?? images.length

    return {
      margin,
      borderRadius,
      defaultIndex,
      onMoveStart,
      onMove,
      onMoveEnd,
      pageLabelRenderer: ({ currentIndex }) =>
        // HACK: defaultProps로 지정해주었기 때문에 존재가 보장됨
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        pageLabelRenderer!({
          currentIndex,
          totalCount,
        }) || null,
    }
  }

  render() {
    const {
      size: globalSize,
      frame: globalFrame,
      images,
      onImageClick,
      ImageSource,
      showMoreRenderer,
      displayedTotalCount,
    } = this.props

    const { carouselProps } = this

    const totalCount = displayedTotalCount ?? images.length

    return (
      <Carousel {...carouselProps}>
        {images.map((image, i) => {
          const {
            frame: imageFrame,
            size: imageSize,
            sizes,
            sourceUrl,
            title,
            description,
          } = image
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
                showMoreRenderer
                  ? showMoreRenderer({
                      currentIndex: i,
                      totalCount,
                    })
                  : null
              }
              overlayType="dark"
              alt={title || description || undefined}
            />
          )
        })}
      </Carousel>
    )
  }
}

export function PageLabel({ currentIndex, totalCount }: RendererProps) {
  return (
    <PageLabelContainer>
      <PageLabelText>{`${currentIndex + 1} / ${totalCount}`}</PageLabelText>
    </PageLabelContainer>
  )
}

import * as React from 'react'
import styled from 'styled-components'
import {
  GlobalSizes,
  FrameRatioAndSizes,
  ImageSourceType,
  ImageV2,
} from '@titicaca/core-elements'
import { ImageMeta as OriginalImageMeta } from '@titicaca/type-definitions'

import Carousel, { CarouselProps } from './carousel'

export interface CarouselImageMeta extends OriginalImageMeta {
  frame?: FrameRatioAndSizes
  size?: GlobalSizes
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
  images: CarouselImageMeta[]
  size?: GlobalSizes
  frame?: FrameRatioAndSizes
  ImageSource?: ImageSourceType
  onImageClick?: (e?: React.SyntheticEvent, image?: CarouselImageMeta) => void
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

          const renderContent = () => {
            const overlayContent = showMoreRenderer
              ? showMoreRenderer({
                  currentIndex: i,
                  totalCount,
                })
              : null

            return (
              <>
                <ImageV2.Img
                  src={sizes.large.url}
                  alt={title || description || undefined}
                />

                <ImageV2.SourceUrl>
                  {ImageSource ? (
                    <ImageSource sourceUrl={sourceUrl}>{sourceUrl}</ImageSource>
                  ) : (
                    sourceUrl
                  )}
                </ImageV2.SourceUrl>

                {overlayContent ? (
                  <ImageV2.Overlay overlayType="dark">
                    {overlayContent}
                  </ImageV2.Overlay>
                ) : null}
              </>
            )
          }

          return (
            <ImageV2 key={i} borderRadius={0}>
              {size ? (
                <ImageV2.FixedDimensionsFrame
                  size={size}
                  onClick={onImageClick && ((e) => onImageClick(e, image))}
                >
                  {renderContent()}
                </ImageV2.FixedDimensionsFrame>
              ) : null}

              {frame ? (
                <ImageV2.FixedRatioFrame
                  frame={frame}
                  onClick={onImageClick && ((e) => onImageClick(e, image))}
                >
                  {renderContent()}
                </ImageV2.FixedRatioFrame>
              ) : null}
            </ImageV2>
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

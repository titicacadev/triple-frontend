import React, { createRef, RefObject } from 'react'
import styled from 'styled-components'
import { ImageSourceType, Image } from '@titicaca/core-elements'
import {
  ImageMeta as OriginalImageMeta,
  GlobalSizes,
  FrameRatioAndSizes,
} from '@titicaca/type-definitions'
import Flicking from '@egjs/react-flicking'

import Carousel, { CarouselProps } from './carousel'

export interface CarouselImageMeta extends OriginalImageMeta {
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
  private flickingRef: RefObject<Flicking>

  static defaultProps: Partial<ImageCarousel['props']> = {
    pageLabelRenderer: (props) => PageLabel(props),
  }

  constructor(props: ImageCarouselProps) {
    super(props)
    this.flickingRef = createRef<Flicking>()
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
      flickingRef: this.flickingRef,
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
            sourceUrl = '',
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
                <Image.Img
                  src={sizes.large.url}
                  alt={title || description || undefined}
                />

                <Image.SourceUrl>
                  {ImageSource ? (
                    <ImageSource sourceUrl={sourceUrl} />
                  ) : (
                    sourceUrl
                  )}
                </Image.SourceUrl>

                {overlayContent ? (
                  <Image.Overlay overlayType="dark">
                    {overlayContent}
                  </Image.Overlay>
                ) : null}
              </>
            )
          }

          return (
            <Image key={i} borderRadius={0}>
              {size ? (
                <Image.FixedDimensionsFrame
                  size={size}
                  onClick={
                    onImageClick &&
                    ((e) =>
                      !this.flickingRef.current?.isPlaying() &&
                      onImageClick(e, image))
                  }
                >
                  {renderContent()}
                </Image.FixedDimensionsFrame>
              ) : (
                <Image.FixedRatioFrame
                  frame={frame}
                  onClick={
                    onImageClick &&
                    ((e) =>
                      !this.flickingRef.current?.isPlaying() &&
                      onImageClick(e, image))
                  }
                >
                  {renderContent()}
                </Image.FixedRatioFrame>
              )}
            </Image>
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

import * as React from 'react'
import styled from 'styled-components'
import Carousel, { CarouselProps } from './carousel'
import { Image, GlobalSizes } from '@titicaca/core-elements'

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

interface ImageCarouselProps extends Partial<CarouselProps> {
  size: GlobalSizes
  frame: GlobalSizes
  images: any[]
  ImageSource: string
  onImageClick: (e?: React.SyntheticEvent, image?: any) => void
  showMoreRenderer: (props: RendererProps) => JSX.Element
  pageLabelRenderer: (props: RendererProps) => JSX.Element
  displayedTotalCount?: number
}

export default class ImageCarousel extends React.PureComponent<
  Partial<ImageCarouselProps>
> {
  static defaultProps = {
    pageLabelRenderer: (props) => PageLabel(props),
  }

  get carouselProps() {
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

    return {
      margin,
      borderRadius,
      defaultIndex,
      onMoveStart,
      onMove,
      onMoveEnd,
      pageLabelRenderer: ({ currentIndex }) =>
        pageLabelRenderer({
          currentIndex,
          totalCount: displayedTotalCount || images.length,
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

    return (
      <Carousel {...carouselProps}>
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
                showMoreRenderer
                  ? showMoreRenderer({
                      currentIndex: i,
                      totalCount: displayedTotalCount || images.length,
                    })
                  : null
              }
              overlayType="dark"
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

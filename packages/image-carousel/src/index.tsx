import * as React from 'react'
import styled from 'styled-components'
import Carousel, { CarouselProps } from './carousel'
import { Image, GlobalSizes } from '@titicaca/triple-design-system'

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
  index: number
  totalCount: number
}

interface ImageCarouselProps extends Partial<CarouselProps> {
  size: GlobalSizes
  frame: GlobalSizes
  images: any[]
  ImageSource: string
  onImageClick: (e?: React.SyntheticEvent, image?: any) => void
  showMoreRenderer: (props: RendererProps) => React.ReactNode | React.ReactNode
  pageLabelRenderer: (props: RendererProps) => React.ReactNode
}

export class ImageCarousel extends React.PureComponent<
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
    } = this.props

    return {
      margin,
      borderRadius,
      defaultIndex,
      onMoveStart,
      onMove,
      onMoveEnd,
      pageLabelRenderer: ({ index }) =>
        pageLabelRenderer({
          index,
          totalCount: images.length,
        }),
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
                showMoreRenderer &&
                showMoreRenderer({
                  index: i,
                  totalCount: images.length,
                })
              }
              overlayType="dark"
            />
          )
        })}
      </Carousel>
    )
  }
}

export function PageLabel({ index, totalCount }: RendererProps) {
  return (
    <PageLabelContainer>
      <PageLabelText>{`${index + 1} / ${totalCount}`}</PageLabelText>
    </PageLabelContainer>
  )
}

export default ImageCarousel

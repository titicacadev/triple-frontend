import styled from 'styled-components'
import ImageCarousel, { PageLabel } from '@titicaca/image-carousel'
import { ImageSource } from '@titicaca/core-elements'

import IMAGES from '../__mocks__/image-carousel.sample.json'
import VIDEOS from '../__mocks__/video-carousel.sample.json'

export default {
  title: 'image-carousel / Image Carousel',
  component: ImageCarousel,
}

const MoreImageOverlayLink = styled.a`
  width: 100%;
  text-align: center;
  color: white;
  vertical-align: middle;
  top: 50%;
  position: absolute;
  transform: translateY(-50%);
  text-decoration: none;
`

const MoreImageOverlayLinkIcon = styled.img`
  width: 20px;
  height: 20px;
  vertical-align: sub;
`
const OverlayContent = () => {
  return (
    <MoreImageOverlayLink href="https://triple.guide">
      트리플 앱에서 더보기
      <MoreImageOverlayLinkIcon src="https://assets.triple.guide/images/ico-arrow@4x.png" />
    </MoreImageOverlayLink>
  )
}

export const Basic = () => {
  return (
    <ImageCarousel
      size="medium"
      images={IMAGES}
      currentPage={0}
      borderRadius={6}
      ImageSource={ImageSource}
      showMoreRenderer={({ currentIndex, totalCount }) => {
        const result =
          totalCount > 5 && currentIndex === totalCount - 1 ? (
            <OverlayContent />
          ) : null
        return result
      }}
      pageLabelRenderer={({ currentIndex, totalCount }) =>
        totalCount <= 5 || currentIndex < totalCount - 1 ? (
          <PageLabel currentIndex={currentIndex} totalCount={totalCount} />
        ) : null
      }
    />
  )
}
Basic.storyName = '일반'

export const Video = () => {
  return (
    <ImageCarousel
      size="medium"
      images={VIDEOS}
      currentPage={0}
      borderRadius={6}
      ImageSource={ImageSource}
      showMoreRenderer={({ currentIndex, totalCount }) => {
        const result =
          totalCount > 5 && currentIndex === totalCount - 1 ? (
            <OverlayContent />
          ) : null
        return result
      }}
      pageLabelRenderer={({ currentIndex, totalCount }) =>
        totalCount <= 5 || currentIndex < totalCount - 1 ? (
          <PageLabel currentIndex={currentIndex} totalCount={totalCount} />
        ) : null
      }
    />
  )
}
Video.storyName = '비디오'

import styled from 'styled-components'
import { ImageSource } from '@titicaca/core-elements'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import IMAGES from './mocks/image-carousel.sample.json'
import VIDEOS from './mocks/video-carousel.sample.json'
import ImageCarousel from './image-carousel'
import { PageLabel } from './page-label'

export default {
  title: 'image-carousel / Image Carousel',
  component: ImageCarousel,
} as ComponentMeta<typeof ImageCarousel>

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

export const Basic: ComponentStory<typeof ImageCarousel> = () => {
  return (
    <ImageCarousel
      size="medium"
      images={IMAGES}
      currentPage={0}
      borderRadius={6}
      ImageSource={ImageSource}
      showMoreRenderer={({ currentIndex, totalCount }) =>
        totalCount > 5 && currentIndex === totalCount - 1 ? (
          <OverlayContent />
        ) : null
      }
      pageLabelRenderer={({ currentIndex, totalCount }) =>
        totalCount <= 5 || currentIndex < totalCount - 1 ? (
          <PageLabel currentIndex={currentIndex} totalCount={totalCount} />
        ) : null
      }
    />
  )
}

export const Video: ComponentStory<typeof ImageCarousel> = () => {
  return (
    <ImageCarousel
      size="medium"
      images={VIDEOS}
      currentPage={0}
      borderRadius={6}
      ImageSource={ImageSource}
      showMoreRenderer={({ currentIndex, totalCount }) =>
        totalCount > 5 && currentIndex === totalCount - 1 ? (
          <OverlayContent />
        ) : null
      }
      pageLabelRenderer={({ currentIndex, totalCount }) =>
        totalCount <= 5 || currentIndex < totalCount - 1 ? (
          <PageLabel currentIndex={currentIndex} totalCount={totalCount} />
        ) : null
      }
    />
  )
}

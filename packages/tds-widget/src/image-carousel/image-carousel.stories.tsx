import type { Meta, StoryObj } from '@storybook/react'
import { styled } from 'styled-components'

import { ImageSource } from '../image-source'

import { ImageCarousel } from './image-carousel'
import IMAGES from './mocks/image-carousel.sample.json'
import VIDEOS from './mocks/video-carousel.sample.json'
import { PageLabel } from './page-label'

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

const meta: Meta<typeof ImageCarousel> = {
  title: 'tds-widget / image-carousel / Image Carousel',
  component: ImageCarousel,
}

export default meta

type Story = StoryObj<typeof ImageCarousel>

const OverlayContent = () => {
  return (
    <MoreImageOverlayLink href="https://triple.guide">
      트리플 앱에서 더보기
      <MoreImageOverlayLinkIcon src="https://assets.triple.guide/images/ico-arrow@4x.png" />
    </MoreImageOverlayLink>
  )
}

export const Basic: Story = {
  render: () => (
    <ImageCarousel
      size="medium"
      images={IMAGES}
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
  ),
}

export const Video: Story = {
  render: () => (
    <ImageCarousel
      size="medium"
      images={VIDEOS}
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
  ),
}

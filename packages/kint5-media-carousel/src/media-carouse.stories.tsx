import type { Meta } from '@storybook/react'

import {
  ONE_IMAGE,
  ONE_VIDEO_ONE_IMAGE,
  THREE_IMAGES,
  FIVE_IMAGES,
  ONE_VIDEO,
  ONE_VIDEO_FOUR_IMAGES,
  SEVEN_IMAGES,
} from './media-mock-data'
import { MediaCarousel } from './media-carousel'

export default { title: 'kint5-media-carousel / 미디어 캐러셀' } as Meta

export function OneImageExample() {
  return <MediaCarousel media={ONE_IMAGE} />
}
OneImageExample.storyName = '이미지 한 개'

export function ThreeImagesExample() {
  return <MediaCarousel media={THREE_IMAGES} />
}
ThreeImagesExample.storyName = '이미지 세 개'

export function FiveImagesExample() {
  return <MediaCarousel media={FIVE_IMAGES} />
}
FiveImagesExample.storyName = '이미지 다섯 개'

export function SevenImagesExample() {
  return <MediaCarousel media={SEVEN_IMAGES} />
}
SevenImagesExample.storyName = '이미지 일곱 개'

export function OneVideoExample() {
  return <MediaCarousel media={ONE_VIDEO} />
}
OneVideoExample.storyName = '동영상 한 개'

export function OneVideoAndOneImageExample() {
  return <MediaCarousel media={ONE_VIDEO_ONE_IMAGE} />
}
OneVideoAndOneImageExample.storyName = '이미지 한 개, 동영상 한 개'

export function OneVideoAndFourImagesExample() {
  return <MediaCarousel media={ONE_VIDEO_FOUR_IMAGES} />
}
OneVideoAndFourImagesExample.storyName = '이미지 네 개, 동영상 한 개'

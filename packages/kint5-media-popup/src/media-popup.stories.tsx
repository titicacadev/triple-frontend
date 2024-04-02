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
import { MediaPopup } from './media-popup'

export default {
  title: 'kint5-meda-popup / 미디어 팝업',
} as Meta

export function OneImageExample() {
  return <MediaPopup open media={ONE_IMAGE} />
}
OneImageExample.storyName = '이미지 한 개'

export function ThreeImagesExample() {
  return <MediaPopup open media={THREE_IMAGES} />
}
ThreeImagesExample.storyName = '이미지 세 개'

export function FiveImagesExample() {
  return <MediaPopup open media={FIVE_IMAGES} />
}
FiveImagesExample.storyName = '이미지 다섯 개'

export function SevenImagesExample() {
  return <MediaPopup open media={SEVEN_IMAGES} />
}
SevenImagesExample.storyName = '이미지 일곱 개'

export function OneVideoExample() {
  return <MediaPopup open media={ONE_VIDEO} />
}
OneVideoExample.storyName = '동영상 한 개'

export function OneVideoAndOneImageExample() {
  return <MediaPopup open media={ONE_VIDEO_ONE_IMAGE} />
}
OneVideoAndOneImageExample.storyName = '이미지 한 개, 동영상 한 개'

export function OneVideoAndFourImagesExample() {
  return <MediaPopup open media={ONE_VIDEO_FOUR_IMAGES} />
}
OneVideoAndFourImagesExample.storyName = '이미지 네 개, 동영상 한 개'

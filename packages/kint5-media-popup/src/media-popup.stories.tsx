import { useState } from 'react'
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
  const [index, setIndex] = useState(0)
  return (
    <MediaPopup
      open
      media={ONE_IMAGE}
      currentMediumIndex={index}
      onMediumChange={setIndex}
    />
  )
}
OneImageExample.storyName = '이미지 한 개'

export function ThreeImagesExample() {
  const [index, setIndex] = useState(0)
  return (
    <MediaPopup
      open
      media={THREE_IMAGES}
      currentMediumIndex={index}
      onMediumChange={setIndex}
    />
  )
}
ThreeImagesExample.storyName = '이미지 세 개'

export function FiveImagesExample() {
  const [index, setIndex] = useState(0)
  return (
    <MediaPopup
      open
      media={FIVE_IMAGES}
      currentMediumIndex={index}
      onMediumChange={setIndex}
    />
  )
}
FiveImagesExample.storyName = '이미지 다섯 개'

export function SevenImagesExample() {
  const [index, setIndex] = useState(3)
  return (
    <MediaPopup
      open
      media={SEVEN_IMAGES}
      currentMediumIndex={index}
      onMediumChange={setIndex}
    />
  )
}
SevenImagesExample.storyName = '이미지 일곱 개 / 초기 인덱스 3'

export function OneVideoExample() {
  const [index, setIndex] = useState(0)
  return (
    <MediaPopup
      open
      media={ONE_VIDEO}
      currentMediumIndex={index}
      onMediumChange={setIndex}
    />
  )
}
OneVideoExample.storyName = '동영상 한 개'

export function OneVideoAndOneImageExample() {
  const [index, setIndex] = useState(0)
  return (
    <MediaPopup
      open
      media={ONE_VIDEO_ONE_IMAGE}
      currentMediumIndex={index}
      onMediumChange={setIndex}
    />
  )
}
OneVideoAndOneImageExample.storyName = '이미지 한 개, 동영상 한 개'

export function OneVideoAndFourImagesExample() {
  const [index, setIndex] = useState(0)
  return (
    <MediaPopup
      open
      media={ONE_VIDEO_FOUR_IMAGES}
      currentMediumIndex={index}
      onMediumChange={setIndex}
    />
  )
}
OneVideoAndFourImagesExample.storyName = '이미지 네 개, 동영상 한 개'

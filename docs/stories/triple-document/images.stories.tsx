import React from 'react'
import { Meta } from '@storybook/react'
import { select, text } from '@storybook/addon-knobs'
import { ELEMENTS } from '@titicaca/triple-document'

import IMAGES from '../__mocks__/images.sample.json'
import IMAGES_FRAME from '../__mocks__/images-frame.sample.json'

const { images: Images } = ELEMENTS

export default {
  title: 'triple-document / 이미지',
  component: Images,
} as Meta

export function OneImage() {
  const [image] = IMAGES

  return (
    <Images
      value={{
        images: [
          {
            ...image,
            frame: select(
              '크기',
              ['mini', 'small', 'medium', 'large', 'big', 'huge', 'original'],
              'small',
            ),
            title: text('캡션', 'TripleDocument 샘플 1'),
            sourceUrl: text('출처', 'https://triple.guide'),
          },
        ],
      }}
    />
  )
}
OneImage.storyName = '1개'

export function OneImageWithFrame() {
  const [image] = IMAGES_FRAME
  return (
    <Images
      value={{
        images: [
          {
            ...image,
            frame: select(
              '크기',
              ['mini', 'small', 'medium', 'large', 'big', 'huge', 'original'],
              'small',
            ),
            title: text('캡션', 'TripleDocument 샘플 1'),
            sourceUrl: text('출처', 'https://triple.guide'),
          },
        ],
      }}
    />
  )
}
OneImageWithFrame.storyName = '1개, 프레임'

export function TwoImages() {
  return (
    <Images
      value={{
        images: IMAGES.map((value) => ({
          ...value,
          title: '',
        })),
      }}
    />
  )
}
TwoImages.storyName = '2개'

export function TwoImagesWithCaption() {
  return (
    <Images
      value={{
        images: IMAGES,
      }}
    />
  )
}
TwoImagesWithCaption.storyName = '2개, 캡션'

export function TwoBlockImages() {
  return (
    <Images
      value={{
        images: IMAGES.map((value) => ({ ...value, title: '' })),
        display: 'block',
      }}
    />
  )
}
TwoBlockImages.storyName = '2개, 블록'

import { Meta, StoryObj } from '@storybook/react'
import { ELEMENTS } from '@titicaca/triple-document'

import IMAGES from '../__mocks__/images.sample.json'
import IMAGES_FRAME from '../__mocks__/images-frame.sample.json'

const { images: Images } = ELEMENTS

export default {
  title: 'triple-document / 이미지',
  component: Images,
} as Meta

export const OneImage: StoryObj = {
  storyName: '1개',
  args: {
    value: {
      images: [
        {
          ...IMAGES[0],
          frame: 'small',
          title: 'TripleDocument 샘플 1',
          sourceUrl: 'https://triple.guide',
        },
      ],
    },
  },
}

export const OneImageWithFrame: StoryObj = {
  storyName: '1개, 프레임',
  args: {
    value: {
      images: [
        {
          ...IMAGES_FRAME[0],
          frame: 'small',
          title: 'TripleDocument 샘플 1',
          sourceUrl: 'https://triple.guide',
        },
      ],
    },
  },
}

export const TwoImages: StoryObj = {
  storyName: '2개',
  args: {
    value: {
      images: IMAGES.map((value) => ({
        ...value,
        title: '',
      })),
    },
  },
}

export const TwoImagesWithCaption: StoryObj = {
  storyName: '2개, 캡션',
  args: {
    value: {
      images: IMAGES,
    },
  },
}

export const TwoBlockImages: StoryObj = {
  storyName: '2개, 블록',
  args: {
    value: {
      images: IMAGES.map((value) => ({ ...value, title: '' })),
      display: 'block',
    },
  },
}

import { Meta, StoryObj } from '@storybook/react'

import IMAGES from './mocks/images.sample.json'
import IMAGES_FRAME from './mocks/images-frame.sample.json'
import ELEMENTS from './elements'

const { images: Images } = ELEMENTS

export default {
  title: 'triple-document / 이미지',
  component: Images,
} as Meta

export const OneImage: StoryObj = {
  name: '1개',
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
  name: '1개, 프레임',
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
  name: '2개',
  args: {
    value: {
      images: IMAGES.slice(0, 2).map((value) => ({
        ...value,
        title: '',
      })),
    },
  },
}

export const TwoImagesWithCaption: StoryObj = {
  name: '2개, 캡션',
  args: {
    value: {
      images: IMAGES.slice(0, 2),
    },
  },
}

export const TwoBlockImages: StoryObj = {
  name: '2개, 블록',
  args: {
    value: {
      images: IMAGES.slice(0, 2).map((value) => ({ ...value, title: '' })),
      display: 'block',
    },
  },
}

export const TwoGridImages: StoryObj = {
  name: '2개, 분할',
  args: {
    value: {
      images: IMAGES.slice(0, 2).map((value) => ({ ...value, title: '' })),
      display: 'grid',
    },
  },
}

export const FiveGridImages: StoryObj = {
  name: '5개, 분할',
  args: {
    value: {
      images: IMAGES.map((value) => ({ ...value, title: '' })),
      display: 'grid',
    },
  },
}

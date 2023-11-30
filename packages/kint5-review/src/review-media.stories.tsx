import type { Meta, StoryObj } from '@storybook/react'

import { ReviewMedia } from './index'

export default {
  title: 'kint5-review / ReviewMedia',
  component: ReviewMedia,
} as Meta<typeof ReviewMedia>

export const OneVideoOnly: StoryObj<typeof ReviewMedia> = {
  args: {
    media: [
      {
        cloudinaryId: '485bbbfb-fd76-48cb-bb85-5dd2aeb7a7b9',
        id: 'df0d0ff7-781f-4a84-bce2-e6661ceae7b9',
        type: 'video',
        sizes: {
          full: {
            url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,f_auto,h_2048,w_2048/485bbbfb-fd76-48cb-bb85-5dd2aeb7a7b9.jpeg',
          },
          large: {
            url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,f_auto,h_1024,w_1024/485bbbfb-fd76-48cb-bb85-5dd2aeb7a7b9.jpeg',
          },
          small_square: {
            url: 'https://media.triple.guide/triple-dev/video/upload/c_fill,f_auto,h_256,w_256/485bbbfb-fd76-48cb-bb85-5dd2aeb7a7b9.jpeg',
          },
        },
        width: 1080,
        height: 1920,
        cloudinaryBucket: 'triple-dev',
        video: {
          full: {
            url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,h_2048,w_2048/485bbbfb-fd76-48cb-bb85-5dd2aeb7a7b9.mp4',
          },
          large: {
            url: 'https://media.triple.guide/triple-dev/video/upload/c_limit,h_1024,w_1024/485bbbfb-fd76-48cb-bb85-5dd2aeb7a7b9.mp4',
          },
          small_square: {
            url: 'https://media.triple.guide/triple-dev/video/upload/c_fill,h_256,w_256/485bbbfb-fd76-48cb-bb85-5dd2aeb7a7b9.mp4',
          },
        },
      },
    ],
  },
}

export const OneImageOnly: StoryObj<typeof ReviewMedia> = {
  args: {
    media: [
      {
        cloudinaryId: '4ba43aa4-6085-4871-aa54-3795bf340c87',
        id: 'b97f2015-cdb2-4db2-9106-1162defbc01e',
        type: 'image',
        sizes: {
          full: {
            url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/4ba43aa4-6085-4871-aa54-3795bf340c87.jpeg',
          },
          large: {
            url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/4ba43aa4-6085-4871-aa54-3795bf340c87.jpeg',
          },
          small_square: {
            url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/4ba43aa4-6085-4871-aa54-3795bf340c87.jpeg',
          },
        },
        width: 1024,
        height: 768,
        cloudinaryBucket: 'triple-dev',
      },
    ],
  },
}

export const TwoImages: StoryObj<typeof ReviewMedia> = {
  args: {
    media: [
      {
        cloudinaryId: 'dc2ce21a-8e48-49cb-b27b-049b0535ac07',
        id: '0687d88b-7be4-4af8-a6c9-8ac40d0d525d',
        type: 'image',
        sizes: {
          full: {
            url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/dc2ce21a-8e48-49cb-b27b-049b0535ac07.jpeg',
          },
          large: {
            url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/dc2ce21a-8e48-49cb-b27b-049b0535ac07.jpeg',
          },
          small_square: {
            url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/dc2ce21a-8e48-49cb-b27b-049b0535ac07.jpeg',
          },
        },
        width: 860,
        height: 1024,
        cloudinaryBucket: 'triple-dev',
      },
      {
        cloudinaryId: '4ba43aa4-6085-4871-aa54-3795bf340c87',
        id: 'b97f2015-cdb2-4db2-9106-1162defbc01e',
        type: 'image',
        sizes: {
          full: {
            url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_2048,w_2048/4ba43aa4-6085-4871-aa54-3795bf340c87.jpeg',
          },
          large: {
            url: 'https://media.triple.guide/triple-dev/c_limit,f_auto,h_1024,w_1024/4ba43aa4-6085-4871-aa54-3795bf340c87.jpeg',
          },
          small_square: {
            url: 'https://media.triple.guide/triple-dev/c_fill,f_auto,h_256,w_256/4ba43aa4-6085-4871-aa54-3795bf340c87.jpeg',
          },
        },
        width: 1024,
        height: 768,
        cloudinaryBucket: 'triple-dev',
      },
    ],
  },
}

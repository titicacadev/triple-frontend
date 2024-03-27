import { Meta, StoryFn } from '@storybook/react'
import { Title, Controls, Primary, Description } from '@storybook/blocks'
import { useState } from 'react'
import { Select } from '@titicaca/core-elements'

import { MetaDataInterface } from '../types'

import { ImageBubbleProp } from './type'

import { ImageBubble } from '.'

const images: MetaDataInterface[] = [...Array(10).keys()].map((_, idx) => ({
  id: `test image_${idx}`,
  width: 1125,
  height: 2436,
  cloudinaryBucket: 'triple-dev',
  cloudinaryId: 'cloudinary',
  type: 'image',
  sizes: {
    full: {
      url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
    },
    large: {
      url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
    },
    smallSquare: {
      url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
    },
  },
}))

function RenderImageBubble() {
  const [imageNumber, setImageNumber] = useState<number>(1)

  return (
    <>
      <Select
        label="이미지 개수 선택"
        options={[...Array(10).keys()].map((number) => ({
          label: (number + 1).toString(),
          value: number + 1,
        }))}
        value={imageNumber}
        onChange={(e) => setImageNumber(e.target.value as unknown as number)}
        css={{ marginBottom: 5 }}
      />

      <ImageBubble images={images.slice(0, imageNumber)} />
    </>
  )
}

export default {
  title: 'chat / Bubble / Images',
  component: ImageBubble,
  parameters: {
    docs: {
      description: {
        component: '이미지 개수에 따라 버블의 UI가 달라집니다.',
      },
      page: () => (
        <>
          <Title />
          <Description />
          <RenderImageBubble />
          <Primary />
          <Controls />
        </>
      ),
    },
  },
} as Meta

const template: StoryFn<ImageBubbleProp> = (args) => <ImageBubble {...args} />

export const Image = {
  render: template,
  args: {
    images: [
      {
        id: 'test image',
        sizes: {
          large: {
            url: 'https://res.cloudinary.com/triple-entry/image/upload/w_1024,h_1024,c_limit,f_auto/07f5ed9c-1102-4ec0-b07c-7b1b098311b2.jpg',
          },
        },
      },
    ],
    appUrlScheme: '',
  },
}

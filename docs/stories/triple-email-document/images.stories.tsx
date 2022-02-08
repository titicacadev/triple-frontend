import React from 'react'
import styled from 'styled-components'
import { ComponentMeta } from '@storybook/react'

import { ELEMENTS } from '../../../packages/triple-email-document'

const { images: Images } = ELEMENTS

export default {
  title: 'Document / triple-email-document / 이미지',
  component: Images,
} as ComponentMeta<typeof Images>

const Container = styled.div`
  max-width: 600px;
`

const ImageTemplate: {
  (args: { propList: React.ComponentProps<typeof Images>[] }): JSX.Element
  storyName?: string
  args?: { propList: React.ComponentProps<typeof Images>[] }
} = (args) => (
  <Container>
    {args.propList.map((props, index) => (
      <Images key={index} {...props} />
    ))}
  </Container>
)

const IMAGE = {
  id: 'IMAGE_ID',
  sizes: {
    full: {
      url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    },
    large: {
      url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    },
    small_square: {
      url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    },
    smallSquare: {
      url: 'https://media.triple.guide/triple-cms/c_limit,f_auto,h_1024,w_1024/be33afd8-c14b-4508-b1f9-8b36bfb29f64.jpeg',
    },
  },
}

const IMAGE_WITH_TITLE = {
  ...IMAGE,
  title: '이미지 제목입니다.',
}

const IMAGE_WITH_LINK = {
  ...IMAGE,
  link: {
    href: 'https://triple.guide',
    label: '여기를 눌러 확인하세요.',
  },
}

const IMAGE_WITH_TITLE_AND_LINK = {
  ...IMAGE_WITH_TITLE,
  ...IMAGE_WITH_LINK,
}

export const Default = ImageTemplate.bind({})
Default.storyName = '간격 없는 이미지 1개'
Default.args = {
  propList: [
    {
      value: {
        display: 'gapless-block',
        images: [IMAGE],
      },
    },
    {
      value: {
        display: 'gapless-block',
        images: [IMAGE_WITH_TITLE],
      },
    },
    {
      value: {
        display: 'gapless-block',
        images: [IMAGE_WITH_LINK],
      },
    },
    {
      value: {
        display: 'gapless-block',
        images: [IMAGE_WITH_TITLE_AND_LINK],
      },
    },
  ],
}

export const TwoImages = ImageTemplate.bind({})
TwoImages.storyName = '간격 없는 이미지 2개'
TwoImages.args = {
  propList: [
    {
      value: {
        display: 'gapless-block',
        images: [IMAGE, IMAGE],
      },
    },
    {
      value: {
        display: 'gapless-block',
        images: [IMAGE_WITH_TITLE, IMAGE_WITH_TITLE],
      },
    },
    {
      value: {
        display: 'gapless-block',
        images: [IMAGE_WITH_LINK, IMAGE_WITH_LINK],
      },
    },
    {
      value: {
        display: 'gapless-block',
        images: [IMAGE_WITH_TITLE_AND_LINK, IMAGE_WITH_TITLE_AND_LINK],
      },
    },
  ],
}

export const OneImageWithPadding = ImageTemplate.bind({})
OneImageWithPadding.storyName = '간격 있는 이미지 1개'
OneImageWithPadding.args = {
  propList: [
    {
      value: {
        display: 'default',
        images: [IMAGE],
      },
    },
    {
      value: {
        display: 'default',
        images: [IMAGE_WITH_TITLE],
      },
    },
    {
      value: {
        display: 'default',
        images: [IMAGE_WITH_LINK],
      },
    },
    {
      value: {
        display: 'default',
        images: [IMAGE_WITH_TITLE_AND_LINK],
      },
    },
  ],
}

export const TwoImagesWithPadding = ImageTemplate.bind({})
TwoImagesWithPadding.storyName = '간격 있는 이미지 2개'
TwoImagesWithPadding.args = {
  propList: [
    {
      value: {
        display: 'default',
        images: [IMAGE, IMAGE],
      },
    },
    {
      value: {
        display: 'default',
        images: [IMAGE_WITH_TITLE, IMAGE_WITH_TITLE],
      },
    },
    {
      value: {
        display: 'default',
        images: [IMAGE_WITH_LINK, IMAGE_WITH_LINK],
      },
    },
    {
      value: {
        display: 'default',
        images: [IMAGE_WITH_TITLE_AND_LINK, IMAGE_WITH_TITLE_AND_LINK],
      },
    },
  ],
}

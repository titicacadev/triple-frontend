import { ComponentProps } from 'react'
import styled from 'styled-components'
import { ComponentMeta } from '@storybook/react'

import ELEMENTS from './elements'

const { embedded: EmbeddedView } = ELEMENTS

const Container = styled.div`
  max-width: 600px;
`

const ImageContainer = styled.div`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Border = styled.div`
  border: 2px solid black;
`

export default {
  title: 'triple-email-document / Embedded',
  component: EmbeddedView,
} as ComponentMeta<typeof EmbeddedView>

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

const EmbeddedTemplate: {
  (args: ComponentProps<typeof EmbeddedView>): JSX.Element
  storyName?: string
  args?: ComponentProps<typeof EmbeddedView>
} = (args) => {
  return (
    <Container>
      <ImageContainer>
        <Border>
          <EmbeddedView value={args.value} />
        </Border>
      </ImageContainer>
    </Container>
  )
}

export const DefaultEmbeddedElement = EmbeddedTemplate.bind({})
DefaultEmbeddedElement.storyName = '기본 (이미지 여백 X)'
DefaultEmbeddedElement.args = {
  value: {
    entries: [
      [
        {
          type: 'images',
          value: {
            display: 'gapless-block',
            images: [IMAGE],
          },
        },
        {
          type: 'heading',
          value: {
            text: '임베디드의 타이틀 영역입니다.',
          },
        },
        {
          type: 'text',
          value: {
            text: '임베디드의 본문 영역입니다.',
          },
        },
        {
          type: 'links',
          value: {
            links: [
              {
                id: 'Link_ID',
                label: '박스 디자인 형식',
                href: '',
              },
            ],
            display: 'block',
          },
        },
      ],
    ],
  },
}

export const withPaddingImageEmbeddedElement = EmbeddedTemplate.bind({})
withPaddingImageEmbeddedElement.storyName = '기본 (이미지 여백 O)'
withPaddingImageEmbeddedElement.args = {
  value: {
    entries: [
      [
        {
          type: 'images',
          value: {
            display: 'default',
            images: [IMAGE],
          },
        },
        {
          type: 'heading',
          value: {
            text: '임베디드의 타이틀 영역입니다.',
          },
        },
        {
          type: 'text',
          value: {
            text: '임베디드의 본문 영역입니다.',
          },
        },
        {
          type: 'links',
          value: {
            links: [
              {
                id: 'Link_ID',
                label: '박스 디자인 형식',
                href: '',
              },
            ],
            display: 'block',
          },
        },
      ],
    ],
  },
}

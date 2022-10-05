import { ComponentProps } from 'react'
import styled from 'styled-components'
import { ComponentMeta } from '@storybook/react'

import ELEMENTS from './elements'

const { images: Images } = ELEMENTS

export default {
  title: 'Document / triple-email-document / elements / 이미지',
  component: Images,
} as ComponentMeta<typeof Images>

const Container = styled.div`
  max-width: 600px;
`

const ImageContainer = styled.div`
  margin-bottom: 30px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Title = styled.div`
  margin-bottom: 10px;
`

const Border = styled.div`
  border: 2px solid black;
`

const TITIES: { [key: string]: string } = {
  0: '사이즈만 있는 이미지 데이터 구조',
  1: '사이즈, 제목이 있는 데이터 구조',
  2: '사이즈, 링크가 있는 데이터 구조',
  3: '사이즈, 링크, 제목이 있는 데이터 구조',
}

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

const ImageTemplate: {
  (args: { propList: ComponentProps<typeof Images>[] }): JSX.Element
  storyName?: string
  args?: {
    propList: ComponentProps<typeof Images>[]
  }
} = (args) => {
  return (
    <Container>
      {args.propList.map((props, index) => (
        <ImageContainer key={index}>
          <Title>{TITIES[index]}</Title>
          <Border>
            <Images {...props} />
          </Border>
        </ImageContainer>
      ))}
    </Container>
  )
}

export const Default = ImageTemplate.bind({})
Default.storyName = '간격 없는 이미지 1개'
Default.args = {
  propList: generateSampleImages('gapless-block'),
}

export const TwoImages = ImageTemplate.bind({})
TwoImages.storyName = '간격 없는 이미지 2개'
TwoImages.args = {
  propList: generateSampleImagesTwo('gapless-block'),
}

export const OneImageWithPadding = ImageTemplate.bind({})
OneImageWithPadding.storyName = '간격 있는 이미지 1개'
OneImageWithPadding.args = {
  propList: generateSampleImages('default'),
}

export const TwoImagesWithPadding = ImageTemplate.bind({})
TwoImagesWithPadding.storyName = '간격 있는 이미지 2개'
TwoImagesWithPadding.args = {
  propList: generateSampleImagesTwo('default'),
}

export const OneImageWithPaddingV2 = ImageTemplate.bind({})
OneImageWithPaddingV2.storyName = '간격 있는 이미지 1개 V2'
OneImageWithPaddingV2.args = {
  propList: generateSampleImagesTwo('default-v2'),
}

export const TwoImagesWithPaddingV2 = ImageTemplate.bind({})
TwoImagesWithPaddingV2.storyName = '간격 있는 이미지 2개 V2'
TwoImagesWithPaddingV2.args = {
  propList: generateSampleImagesTwo('default-v2'),
}

type ImageDisply = 'default' | 'gapless-block' | 'default-v2'

function generateSampleImagesTwo(type: ImageDisply) {
  return [
    {
      value: {
        display: type,
        images: [IMAGE, IMAGE],
      },
    },
    {
      value: {
        display: type,
        images: [IMAGE_WITH_TITLE, IMAGE_WITH_TITLE],
      },
    },
    {
      value: {
        display: type,
        images: [IMAGE_WITH_LINK, IMAGE_WITH_LINK],
      },
    },
    {
      value: {
        display: type,
        images: [IMAGE_WITH_TITLE_AND_LINK, IMAGE_WITH_TITLE_AND_LINK],
      },
    },
  ]
}

function generateSampleImages(type: ImageDisply) {
  return [
    {
      value: {
        display: type,
        images: [IMAGE],
      },
    },
    {
      value: {
        display: type,
        images: [IMAGE_WITH_TITLE],
      },
    },
    {
      value: {
        display: type,
        images: [IMAGE_WITH_LINK],
      },
    },
    {
      value: {
        display: type,
        images: [IMAGE_WITH_TITLE_AND_LINK],
      },
    },
  ]
}

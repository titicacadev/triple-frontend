import { ComponentMeta } from '@storybook/react'
import { ELEMENTS } from '@titicaca/triple-email-document'

const { link: Link } = ELEMENTS

export default {
  title: 'Document / triple-email-document / elements / 링크',
  component: Link,
  argTypes: {
    value: {
      id: {
        type: 'string',
        require: true,
      },
      label: {
        type: 'string',
        require,
      },
      href: {
        type: 'string',
        require: true,
      },
      display: {
        type: 'string',
        require: true,
      },
    },
  },
} as ComponentMeta<typeof Link>

export const StyledButtonLinkElement = {
  storyName: '버튼',
  args: generateSampleData('button'),
}

StyledButtonLinkElement.storyName = '버튼'

export const StyledBlockLinkElement = {
  storyName: '박스',
  args: generateSampleData('block'),
}

StyledBlockLinkElement.storyName = '블락'

export const StyledLargeButtonLinkElement = {
  storyName: '대형 버튼',
  args: generateSampleData('largeButton'),
}

StyledLargeButtonLinkElement.storyName = '대형 버튼'

export const StyledCompactLargeButtonLinkElement = {
  storyName: 'compact한 대형 버튼',
  args: generateSampleData('largeCompactButton'),
}

StyledCompactLargeButtonLinkElement.storyName = 'compact한 대형 버튼'

type LinkDisplay = 'button' | 'block' | 'largeButton' | 'largeCompactButton'

function generateSampleData(type: LinkDisplay) {
  return {
    value: {
      id: 'Link_ID',
      label: `${type} 디자인 형식`,
      href: '',
      display: type,
    },
  }
}

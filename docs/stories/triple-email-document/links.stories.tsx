import { Meta } from '@storybook/react'
import { ELEMENTS } from '@titicaca/triple-email-document'

const { links: Links } = ELEMENTS

export default {
  title: 'Document / triple-email-document / elements / 링크',
  component: Links,
  argTypes: {
    value: {
      links: {
        id: {
          type: 'string',
          require: true,
        },
        label: {
          type: 'string',
        },
        href: {
          type: 'string',
          require: true,
        },
      },
      display: {
        type: 'string',
        require: true,
      },
    },
  },
} as Meta

export const StyledButtonLinkElement = {
  name: '버튼',
  args: generateSampleData('button'),
}

StyledButtonLinkElement.storyName = '버튼'

export const StyledBlockLinkElement = {
  name: '박스',
  args: generateSampleData('block'),
}

StyledBlockLinkElement.storyName = '블락'

export const StyledLargeButtonLinkElement = {
  name: '대형 버튼',
  args: generateSampleData('largeButton'),
}

StyledLargeButtonLinkElement.storyName = '대형 버튼'

export const StyledCompactLargeButtonLinkElement = {
  name: 'compact한 대형 버튼',
  args: generateSampleData('largeCompactButton'),
}

StyledCompactLargeButtonLinkElement.storyName = 'compact한 대형 버튼'

type LinkDisplay = 'button' | 'block' | 'largeButton' | 'largeCompactButton'

function generateSampleData(type: LinkDisplay) {
  return {
    value: {
      links: [
        {
          id: 'Link_ID',
          label: `${type} 디자인 형식`,
          href: '',
        },
      ],
      display: type,
    },
  }
}

import { Meta, StoryObj } from '@storybook/react'

import ELEMENTS from './elements'

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

export const StyledButtonLinkElement: StoryObj = {
  name: '버튼',
  args: generateSampleData('button'),
}

export const StyledBlockLinkElement: StoryObj = {
  name: '블락',
  args: generateSampleData('block'),
}

export const StyledLargeButtonLinkElement: StoryObj = {
  name: '대형 버튼',
  args: generateSampleData('largeButton'),
}

export const StyledCompactLargeButtonLinkElement: StoryObj = {
  name: 'compact한 대형 버튼',
  args: generateSampleData('largeCompactButton'),
}

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

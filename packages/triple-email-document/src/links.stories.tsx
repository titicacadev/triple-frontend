import { Meta, StoryObj } from '@storybook/react'

import { LinkClickHandlerProvider } from './context'
import ELEMENTS from './elements'

const { links: Links } = ELEMENTS

export default {
  title: 'triple-email-document / Links',
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
  decorators: [
    (Story) => (
      <LinkClickHandlerProvider>
        <Story />
      </LinkClickHandlerProvider>
    ),
  ],
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
          href: '/regions/e3803739-d1c4-441e-a3f7-5a057fa851c8/articles/991aea4e-4645-4682-9bb5-f0e070e1f169',
        },
      ],
      display: type,
    },
  }
}

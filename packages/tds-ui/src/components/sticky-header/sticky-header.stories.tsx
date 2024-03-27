import type { Meta, StoryObj } from '@storybook/react'

import { StickyHeader } from './sticky-header'

const meta: Meta<typeof StickyHeader> = {
  title: 'tds-ui / StickyHeader',
  component: StickyHeader,
  args: {
    zIndex: 3,
  },
  argTypes: {
    zTier: { type: 'number' },
    zIndex: { type: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component: '최상단에 `sticky`하게 고정시켜주는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

export const Default: StoryObj<typeof StickyHeader> = {
  args: {
    children: 'Basic StickyHeader',
  },
}

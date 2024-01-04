import type { StoryObj } from '@storybook/react'

import { Spinner } from './spinner'

const meta = {
  title: 'tds-ui / Spinner / Spinner',
  component: Spinner,
  argTypes: {
    full: { type: 'boolean' },
    zTier: { type: 'number' },
    zIndex: { type: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 데이터를 불러오고 있음을 알려주는 뷰 컴포넌트입니다.',
      },
      story: {
        inline: false,
        iframeHeight: 300,
      },
    },
  },
}

export default meta

export const Default: StoryObj<typeof Spinner> = {
  args: {
    full: false,
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { Tag } from './tag'

const meta: Meta<typeof Tag> = {
  title: 'tds-ui / Tag',
  component: Tag,
  argTypes: {
    type: {
      control: 'select',
      options: ['special', 'pink', 'purple', 'default'],
    },
    size: { control: 'select', options: ['tiny', 'mini', 'small', 'medium'] },
  },
  parameters: {
    docs: {
      description: {
        component: '이벤트 태그에 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

export const Default: StoryObj<typeof Tag> = {
  args: {
    type: 'default',
    size: 'mini',
    children: '이벤트~태그',
  },
}

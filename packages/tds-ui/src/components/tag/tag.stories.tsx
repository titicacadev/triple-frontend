import type { Meta, StoryObj } from '@storybook/react'

import type { GlobalSizes } from '../../commons'

import { Tag, type TagColors } from './tag'

const meta: Meta<typeof Tag> = {
  title: 'tds-ui / Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: '이벤트 스티커에 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

const COLORS: TagColors[] = ['special', 'pink', 'purple', 'default']
const PADDING_SIZES: GlobalSizes[] = ['tiny', 'mini', 'small', 'medium']

export const Default: StoryObj<typeof Tag> = {
  render: () => {
    return (
      <>
        <div>색상</div>
        <p>
          {COLORS.map((color, idx) => (
            <Tag key={idx} type={color}>
              {color}
            </Tag>
          ))}
        </p>

        <div>여백 크기</div>
        <p>
          {PADDING_SIZES.map((size, idx) => (
            <Tag key={idx} size={size}>
              {size}
            </Tag>
          ))}
        </p>
      </>
    )
  },
}

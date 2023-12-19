import type { Meta, StoryObj } from '@storybook/react'

import {
  Skeleton,
  SkeletonButton,
  SkeletonCircle,
  SkeletonText,
} from './skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'tds-ui / Skeleton',
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 실제 데이터가 렌더링 되기 전에 보이게 될 화면의 윤곽을 먼저 그려주는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

export const Box: StoryObj<typeof Skeleton> = {
  name: '기본 (박스)',
  render: () => {
    return (
      <Skeleton
        borderRadius={4}
        css={{
          height: '150px',
          margin: '0 0 15px',
        }}
      />
    )
  },
}

export const Text: StoryObj<typeof SkeletonText> = {
  name: '기본 (텍스트)',
  render: () => {
    return (
      <SkeletonText
        borderRadius={4}
        css={{
          margin: '0 0 15px',
        }}
      />
    )
  },
}

export const Button: StoryObj<typeof SkeletonButton> = {
  name: '기본 (버튼)',
  render: () => {
    return <SkeletonButton borderRadius={4} />
  },
}

export const Circle: StoryObj<typeof SkeletonButton> = {
  name: '기본 (원형)',
  render: () => {
    return (
      <SkeletonCircle
        css={{
          margin: '0 0 15px',
        }}
      />
    )
  },
}

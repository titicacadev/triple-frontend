import type { Meta, StoryObj } from '@storybook/react'

import { Rating } from './rating'

const meta: Meta<typeof Rating> = {
  title: 'tds-ui / Rating',
  component: Rating,
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 리뷰 평점을 제공하는 뷰 컴포넌트입니다.\n * 최솟값 0, 최댓값 5**로 설정됩니다.\n * score에 최소, 최대보다 작거나 큰 값을 넣어도 동작합니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Rating>

export const Default: Story = {
  name: '기본',
  args: {
    size: 'tiny',
    score: 5,
  },
  render: (args) => {
    return <Rating {...args} />
  },
}

export const Score: Story = {
  name: '점수',
  render: () => {
    return (
      <>
        <Rating size="tiny" score={3} />
        <br />
        <Rating size="tiny" score={-6} />
        <br />
        <Rating size="tiny" score={11} />
      </>
    )
  },
}

export const Size: Story = {
  name: '크기',
  render: () => {
    return (
      <>
        <Rating size="tiny" score={3} />
        <br />
        <Rating size="small" score={3} />
        <br />
        <Rating size="medium" score={3} />
      </>
    )
  },
}

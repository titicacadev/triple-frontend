import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import { NumericSpinner } from './numeric-spinner'

const meta: Meta<typeof NumericSpinner> = {
  title: 'tds-ui / NumericSpinner',
  component: NumericSpinner,
  parameters: {
    docs: {
      description: {
        component:
          '사용자가 버튼을 통해 숫자를 조절할 수 있는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof NumericSpinner>

export const Default: Story = {
  name: '기본',
  args: {
    label: '성인',
    value: 0,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: number) => {
      updateArgs({ value })
    }

    return <NumericSpinner {...args} value={value} onChange={handleChange} />
  },
}

export const Disabled: Story = {
  name: '비활성화',
  args: {
    label: '성인',
    disabled: true,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: number) => {
      updateArgs({ value })
    }

    return <NumericSpinner {...args} value={value} onChange={handleChange} />
  },
}

export const Label: Story = {
  name: '스티커',
  args: {
    label: '성인',
    value: 0,
    sublabel: '10,000원',
    strikeLabel: '20,000원',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: number) => {
      updateArgs({ value })
    }

    return <NumericSpinner {...args} value={value} onChange={handleChange} />
  },
}

export const Size: Story = {
  name: '글자 크기',
  args: {
    label: '성인',
    value: 0,
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (value: number) => {
      updateArgs({ value })
    }

    return (
      <>
        <NumericSpinner
          {...args}
          value={value}
          size="tiny"
          onChange={handleChange}
        />
        <NumericSpinner
          {...args}
          value={value}
          size="medium"
          onChange={handleChange}
        />
        <NumericSpinner
          {...args}
          value={value}
          size="big"
          onChange={handleChange}
        />
      </>
    )
  },
}

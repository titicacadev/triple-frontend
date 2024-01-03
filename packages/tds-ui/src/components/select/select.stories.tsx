import { ChangeEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import { Select } from './select'

const meta: Meta<typeof Select> = {
  title: 'tds-ui / Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 옵션 선택을 제공할 때 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}
export default meta

type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    value: '',
    placeholder: '시간을 선택해주세요',
    options: [
      {
        label: '12:00',
        value: '12:00',
      },
      {
        label: '12:10',
        value: '12:10',
      },
      {
        label: '12:20',
        value: '12:20',
      },
    ],
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      updateArgs({ value: event.target.value })
    }

    return <Select {...args} value={value} onChange={handleChange} />
  },
}

export const WithLabel: Story = {
  args: {
    value: '',
    label: '투어티켓 시간',
    placeholder: '시간을 선택해주세요',
    options: [
      {
        label: '12:00',
        value: '12:00',
      },
      {
        label: '12:10',
        value: '12:10',
      },
      {
        label: '12:20',
        value: '12:20',
      },
    ],
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      updateArgs({ value: event.target.value })
    }

    return <Select {...args} value={value} onChange={handleChange} />
  },
}

export const WithHelpMessage: Story = {
  args: {
    value: '',
    label: '투어티켓 시간',
    placeholder: '시간을 선택해주세요',
    help: 'Help text',
    options: [
      {
        label: '12:00',
        value: '12:00',
      },
      {
        label: '12:10',
        value: '12:10',
      },
      {
        label: '12:20',
        value: '12:20',
      },
    ],
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      updateArgs({ value: event.target.value })
    }

    return <Select {...args} value={value} onChange={handleChange} />
  },
}

export const WithErrorMessage: Story = {
  args: {
    value: '',
    label: '투어티켓 시간',
    placeholder: '시간을 선택해주세요',
    error: 'Error text',
    options: [
      {
        label: '12:00',
        value: '12:00',
      },
      {
        label: '12:10',
        value: '12:10',
      },
      {
        label: '12:20',
        value: '12:20',
      },
    ],
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
      updateArgs({ value: event.target.value })
    }

    return <Select {...args} value={value} onChange={handleChange} />
  },
}

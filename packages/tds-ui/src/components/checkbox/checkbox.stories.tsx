import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import { Checkbox } from './checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'tds-ui / Checkbox ',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component:
          '사용자가 수많은 선택 사항에서 여러 개를 선택할 수 있도록 제공하는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Square: Story = {
  render: (args) => {
    return (
      <div css={{ display: 'inline-block' }}>
        <Checkbox {...args} variant="square" />
        <Checkbox {...args} variant="square" checked />
      </div>
    )
  },
}

export const Round: Story = {
  render: (args) => {
    return (
      <div css={{ display: 'inline-block' }}>
        <Checkbox {...args} variant="round" />
        <Checkbox {...args} variant="round" checked />
      </div>
    )
  },
}

export const WithText: Story = {
  args: {
    variant: 'square',
    checked: true,
  },
  render: function Render(args) {
    const [{ checked }, updateArgs] = useArgs()

    const onChange = () => {
      updateArgs({ checked: !checked })
    }

    return (
      <div css={{ display: 'inline-block' }}>
        <Checkbox {...args} onChange={onChange}>
          개인정보 동의
        </Checkbox>
      </div>
    )
  },
}

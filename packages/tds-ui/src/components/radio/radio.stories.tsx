import type { ChangeEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import { Radio } from './radio'

const meta: Meta<typeof Radio> = {
  title: 'tds-ui / Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: '라디오 버튼 기능을 제공하는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

export const Default: StoryObj<typeof Radio> = {
  name: '기본',
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      updateArgs({ value: event.target.value })
    }
    return (
      <>
        <Radio
          {...args}
          value="radio-1"
          checked={value === 'radio-1'}
          onChange={handleChange}
        >
          Radio-1
        </Radio>
        <Radio
          {...args}
          value="radio-2"
          checked={value === 'radio-2'}
          onChange={handleChange}
        >
          Radio-2
        </Radio>
      </>
    )
  },
}

import { SyntheticEvent } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'

import { SearchNavbar } from './search-navbar'

const meta: Meta<typeof SearchNavbar> = {
  title: 'tds-ui / Navbar / Search',
  component: SearchNavbar,
  args: {
    backIconType: 'back',
    borderless: false,
  },
  argTypes: {
    backIconType: { control: 'select', options: ['back', 'close'] },
    placeholder: { type: 'string' },
    borderless: { type: 'boolean' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '최상단에 검색 기능을 제공해야할 때 사용되는 뷰 컴포넌트입니다.',
      },
    },
  },
}

export default meta

type Story = StoryObj<typeof SearchNavbar>

export const Back: Story = {
  args: {
    placeholder: '키워드를 입력해보세요',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (e: SyntheticEvent, value: string) => {
      updateArgs({ value })
    }

    return (
      <>
        <SearchNavbar {...args} onInputChange={handleChange} />
        <div>{value}</div>
      </>
    )
  },
}

export const Close: Story = {
  args: {
    placeholder: '키워드를 입력해보세요',
    backIconType: 'close',
  },
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs()

    const handleChange = (e: SyntheticEvent, value: string) => {
      updateArgs({ value })
    }

    return (
      <>
        <SearchNavbar
          {...args}
          onBackClick={() => {}}
          onDeleteClick={() => {}}
          onInputChange={handleChange}
          onKeyUp={() => {}}
          onBlur={() => {}}
          onFocus={() => {}}
          onSearch={() => {}}
        />
        <div>{value}</div>
      </>
    )
  },
}

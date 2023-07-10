import type { Meta, StoryObj } from '@storybook/react'

import Search from '.'

export default {
  title: 'search / Search',
  component: Search,
} as Meta<typeof Search>

export const Basic: StoryObj<typeof Search> = {
  args: {
    placeholder: '“항공권 예약” 도시이름으로 검색',
  },
}

export const Borderless: StoryObj<typeof Search> = {
  args: {
    ...Basic.args,
    borderless: true,
  },
}

export const DefaultKeyword: StoryObj<typeof Search> = {
  args: {
    ...Basic.args,
    defaultKeyword: '제주',
  },
}

export const Controlled: StoryObj<typeof Search> = {
  args: {
    ...Basic.args,
    keyword: '인천',
  },
}

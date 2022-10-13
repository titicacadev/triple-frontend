import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import Search from '.'

export default {
  title: 'search / Search',
  component: Search,
} as ComponentMeta<typeof Search>

export const Basic: ComponentStoryObj<typeof Search> = {
  args: {
    placeholder: '“항공권 예약” 도시이름으로 검색',
  },
}

export const Borderless: ComponentStoryObj<typeof Search> = {
  args: {
    ...Basic.args,
    borderless: true,
  },
}

export const DefaultKeyword: ComponentStoryObj<typeof Search> = {
  args: {
    ...Basic.args,
    defaultKeyword: '제주',
  },
}

export const Controlled: ComponentStoryObj<typeof Search> = {
  args: {
    ...Basic.args,
    keyword: '인천',
  },
}

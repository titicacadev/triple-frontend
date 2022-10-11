import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import Search from '.'

export default {
  title: 'search / Search',
  component: Search,
} as ComponentMeta<typeof Search>

export const Basic: ComponentStoryObj<typeof Search> = {
  args: {},
}

export const WithPlaceholder: ComponentStoryObj<typeof Search> = {
  args: {
    placeholder: '“항공권 예약” 도시이름으로 검색',
  },
}

export const WithDefaultKeyword: ComponentStoryObj<typeof Search> = {
  args: {
    placeholder: '“항공권 예약” 도시이름으로 검색',
    defaultKeyword: '제주',
  },
}

export const Controlled: ComponentStoryObj<typeof Search> = {
  args: {
    placeholder: '“항공권 예약” 도시이름으로 검색',
    defaultKeyword: '제주',
    keyword: '인천',
  },
}

export const Borderless: ComponentStoryObj<typeof Search> = {
  args: {
    borderless: true,
  },
}

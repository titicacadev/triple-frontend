import Search from '@titicaca/search'
import { ComponentStoryObj, Meta } from '@storybook/react'

export default {
  title: 'search / Search',
  component: Search,
} as Meta

export const Uncontrolled: ComponentStoryObj<typeof Search> = {
  args: {
    borderless: false,
    placeholder: '“항공권 예약” 도시이름으로 검색',
  },
}

export const Controlled: ComponentStoryObj<typeof Search> = {
  args: {
    borderless: false,
    keyword: '',
    defaultKeyword: '',
    placeholder: '“항공권 예약” 도시이름으로 검색',
  },
}

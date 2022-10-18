import Search from '@titicaca/search'
import { ComponentStoryObj, Meta } from '@storybook/react'

import { userAgentProviderDecorator } from '../../decorators'

export default {
  title: 'search / Search',
  component: Search,
  decorators: [userAgentProviderDecorator],
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

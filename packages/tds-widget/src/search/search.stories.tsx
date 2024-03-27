import type { Meta, StoryObj } from '@storybook/react'

import { FullScreenSearchView } from './search'

export default {
  title: 'search / Search',
  component: FullScreenSearchView,
} as Meta<typeof FullScreenSearchView>

export const Basic: StoryObj<typeof FullScreenSearchView> = {
  args: {
    placeholder: '“항공권 예약” 도시이름으로 검색',
  },
}

export const Borderless: StoryObj<typeof FullScreenSearchView> = {
  args: {
    ...Basic.args,
    borderless: true,
  },
}

export const DefaultKeyword: StoryObj<typeof FullScreenSearchView> = {
  args: {
    ...Basic.args,
    defaultKeyword: '제주',
  },
}

export const Controlled: StoryObj<typeof FullScreenSearchView> = {
  args: {
    ...Basic.args,
    keyword: '인천',
  },
}

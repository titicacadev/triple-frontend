import type { Meta, StoryObj } from '@storybook/react'

import { PoiDetailActions } from './actions'

export default {
  title: 'poi-detail / Actions',
  component: PoiDetailActions,
  decorators: [
    (Story) => {
      localStorage.setItem('REVIEW_TOOLTIP_EXPOSED', 'false')
      return Story()
    },
  ],
} as Meta<typeof PoiDetailActions>

export const Basic: StoryObj<typeof PoiDetailActions> = {
  args: {
    poiId: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
    scraped: false,
    reviewed: false,
  },
}

export const NoDivider: StoryObj<typeof PoiDetailActions> = {
  args: {
    ...Basic.args,
    noDivider: true,
  },
}

export const GlobalHotel: StoryObj<typeof PoiDetailActions> = {
  args: {
    ...Basic.args,
    onScheduleAdd: undefined,
    onScrapedChange: undefined,
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { PoiDetailActions } from './actions'

export default {
  title: 'tds-widget / poi-detail / Actions',
  component: PoiDetailActions,
  args: {
    poiId: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
  },
  decorators: [
    (Story) => {
      localStorage.setItem('REVIEW_TOOLTIP_EXPOSED', 'false')
      return Story()
    },
  ],
} as Meta<typeof PoiDetailActions>

export const Basic: StoryObj<typeof PoiDetailActions> = {
  args: {
    onContentShare: () => {},
    onReviewEdit: () => {},
    onScheduleAdd: () => {},
    onScrapedChange: () => {},
  },
}

export const NoDivider: StoryObj<typeof PoiDetailActions> = {
  args: {
    noDivider: true,
    onContentShare: () => {},
    onReviewEdit: () => {},
    onScheduleAdd: () => {},
    onScrapedChange: () => {},
  },
}

export const GlobalHotel: StoryObj<typeof PoiDetailActions> = {
  args: {
    onContentShare: () => {},
    onReviewEdit: () => {},
  },
}

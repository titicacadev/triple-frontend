import { ComponentStoryObj, Meta } from '@storybook/react'

import Actions from './actions'

export default {
  title: 'poi-detail / Actions',
  component: Actions,
} as Meta

export const Basic: ComponentStoryObj<typeof Actions> = {
  name: '일반',
  args: {
    poiId: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
    scraped: false,
    reviewed: false,
    onContentShare: () => {},
    onReviewEdit: () => {},
    onScheduleAdd: () => {},
    onScrapedChange: () => {},
  },
}

export const GlobalHotel: ComponentStoryObj<typeof Actions> = {
  name: '호텔 (Global)',
  args: {
    poiId: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
    scraped: false,
    reviewed: false,
    onContentShare: () => {},
    onReviewEdit: () => {},
  },
}

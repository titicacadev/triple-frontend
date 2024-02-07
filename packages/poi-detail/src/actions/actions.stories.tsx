import type { Meta, StoryObj } from '@storybook/react'

import Actions from './actions'

export default {
  title: 'poi-detail / Actions',
  component: Actions,
  decorators: [
    (Story) => {
      return Story()
    },
  ],
} as Meta<typeof Actions>

export const Basic: StoryObj<typeof Actions> = {
  args: {
    poiId: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
    scraped: false,
    reviewed: false,
  },
}

export const NoDivider: StoryObj<typeof Actions> = {
  args: {
    ...Basic.args,
    noDivider: true,
  },
}

export const GlobalHotel: StoryObj<typeof Actions> = {
  args: {
    ...Basic.args,
    onScheduleAdd: undefined,
    onScrapedChange: undefined,
  },
}

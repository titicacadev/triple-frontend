import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import Actions from './actions'

export default {
  title: 'poi-detail / Actions',
  component: Actions,
  decorators: [
    (Story) => {
      localStorage.setItem('REVIEW_TOOLTIP_EXPOSED', 'false')
      return Story()
    },
  ],
} as ComponentMeta<typeof Actions>

export const Basic: ComponentStoryObj<typeof Actions> = {
  args: {
    poiId: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
    scraped: false,
    reviewed: false,
  },
}

export const NoDivider: ComponentStoryObj<typeof Actions> = {
  args: {
    ...Basic.args,
    noDivider: true,
  },
}

export const GlobalHotel: ComponentStoryObj<typeof Actions> = {
  args: {
    ...Basic.args,
    onScheduleAdd: undefined,
    onScrapedChange: undefined,
  },
}

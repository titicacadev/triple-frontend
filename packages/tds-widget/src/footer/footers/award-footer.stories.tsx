import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'
import { http, HttpResponse } from 'msw'

import MockFooterInfo from '../mocks/footer.json'

import { AwardFooter } from './award-footer'

export default {
  title: 'tds-widget / footer / AwardFooter',
  component: AwardFooter,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
} as Meta<typeof AwardFooter>

export const Basic: StoryObj<typeof AwardFooter> = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          'https://assets.triple-dev.titicaca-corp.com/footer/footer.json',
          async () => {
            return HttpResponse.json(MockFooterInfo)
          },
        ),
      ],
    },
  },
}

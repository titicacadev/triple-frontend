import type { Meta, StoryObj } from '@storybook/react'
import { EventTrackingProvider } from '@titicaca/triple-web'
import { http, HttpResponse } from 'msw'

import { DefaultFooter } from './default-footer'
import MockFooterInfo from './footer.json'

export default {
  title: 'tds-widget / footer / Footer',
  component: DefaultFooter,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
} as Meta<typeof DefaultFooter>

export const Basic: StoryObj<typeof DefaultFooter> = {
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

export const NoButtons: StoryObj<typeof DefaultFooter> = {
  args: {
    hideAppDownloadButton: true,
  },
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

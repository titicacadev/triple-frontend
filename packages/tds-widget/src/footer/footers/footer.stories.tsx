import type { Meta, StoryObj } from '@storybook/react'
import { http, HttpResponse } from 'msw'

import MockFooterInfo from '../mocks/footer.json'

import { DefaultFooter } from './default-footer'

export default {
  title: 'footer / Footer',
  component: DefaultFooter,
} as Meta<typeof DefaultFooter>

export const Basic: StoryObj<typeof DefaultFooter> = {
  args: {
    extraLinkVisible: true,
    awardsVisible: true,
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

export const SkeletonFooter: StoryObj<typeof DefaultFooter> = {
  parameters: {
    msw: {
      handlers: [
        http.get(
          'https://assets.triple-dev.titicaca-corp.com/footer/footer.json',
          async () => {
            return HttpResponse.json(null)
          },
        ),
      ],
    },
  },
}

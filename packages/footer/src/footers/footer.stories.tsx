import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'

import MockFooterInfo from '../mocks/footer.json'

import Footer from './default-footer'

export default {
  title: 'footer / Footer',
  component: Footer,
} as Meta<typeof Footer>

export const Basic: StoryObj<typeof Footer> = {
  args: {
    extraLinkVisible: true,
    awardsVisible: true,
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(
          'https://assets.triple-dev.titicaca-corp.com/footer/footer.json',
          async (req, res, ctx) => {
            return res(ctx.json(MockFooterInfo))
          },
        ),
      ],
    },
  },
}

export const NoButtons: StoryObj<typeof Footer> = {
  args: {
    hideAppDownloadButton: true,
  },
  parameters: {
    msw: {
      handlers: [
        rest.get(
          'https://assets.triple-dev.titicaca-corp.com/footer/footer.json',
          async (req, res, ctx) => {
            return res(ctx.json(MockFooterInfo))
          },
        ),
      ],
    },
  },
}

export const SkeletonFooter: StoryObj<typeof Footer> = {
  parameters: {
    msw: {
      handlers: [
        rest.get(
          'https://assets.triple-dev.titicaca-corp.com/footer/footer.json',
          async (req, res, ctx) => {
            return res(ctx.json(null))
          },
        ),
      ],
    },
  },
}

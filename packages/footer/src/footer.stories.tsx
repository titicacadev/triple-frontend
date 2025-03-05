import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'

import Footer from './default-footer'
import CompanyInfo from './footer.json'

export default {
  title: 'footer / Footer',
  component: Footer,
} as Meta<typeof Footer>

export const Basic: StoryObj<typeof Footer> = {}

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
            return res(ctx.json(CompanyInfo))
          },
        ),
      ],
    },
  },
}

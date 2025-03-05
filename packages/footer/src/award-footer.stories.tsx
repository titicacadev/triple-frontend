import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'

import { AwardFooter } from './award-footer'
import MockFooterInfo from './footer.json'

export default {
  title: 'footer / AwardFooter',
  component: AwardFooter,
} as Meta<typeof AwardFooter>

export const Basic: StoryObj<typeof AwardFooter> = {
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

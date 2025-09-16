import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'

import MockFooterInfo from '../mocks/footer.json'

import { AwardFooter } from './award-footer'

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

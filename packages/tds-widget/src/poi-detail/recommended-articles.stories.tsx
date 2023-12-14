import type { Meta, StoryObj } from '@storybook/react'
import { rest } from 'msw'
import { EventTrackingProvider } from '@titicaca/triple-web'

import RECOMMNEDED_ARTICLES from './mocks/recommended-articles.json'
import INVENTORY_ITEMS from './mocks/inventory-item.json'
import RecommendedArticles from './recommended-articles/recommended-articles'

const meta: Meta<typeof RecommendedArticles> = {
  title: 'poi-detail / RecommendedArticles',
  component: RecommendedArticles,
  decorators: [
    (Story) => (
      <EventTrackingProvider page={{ path: '/', label: 'test' }} utm={{}}>
        <Story />
      </EventTrackingProvider>
    ),
  ],
}

export default meta

type Story = StoryObj<typeof RecommendedArticles>

export const Basic: Story = {
  args: {
    appInstallationCta: {
      inventoryId: 'app-install-cta-poi-v1',
      href: 'https://triple-dev.titicaca-corp.com',
    },
    regionId: '23c5965b-01ad-486b-a694-a2ced15f245c',
  },
  parameters: {
    msw: {
      handlers: [
        rest.get('/api/content/articles', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(RECOMMNEDED_ARTICLES))
        }),
        rest.get('/api/inventories/v1/:inventoryId/items', (req, res, ctx) => {
          return res(ctx.status(200), ctx.json(INVENTORY_ITEMS))
        }),
      ],
    },
  },
}

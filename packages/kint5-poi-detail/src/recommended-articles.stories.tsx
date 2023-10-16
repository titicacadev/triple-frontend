import type { Meta, StoryObj } from '@storybook/react'

import RecommendedArticles from './recommended-articles/recommended-articles'

export default {
  title: 'kint5-poi-detail / RecommendedArticles',
  component: RecommendedArticles,
} as Meta<typeof RecommendedArticles>

export const Basic: StoryObj<typeof RecommendedArticles> = {
  args: {
    appInstallationCta: {
      inventoryId: 'app-install-cta-footer-hotel-v1',
      href: 'https://triple-dev.titicaca-corp.com',
    },
    regionId: '23c5965b-01ad-486b-a694-a2ced15f245c',
  },
}

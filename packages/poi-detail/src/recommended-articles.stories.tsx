import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import RecommendedArticles from './recommended-articles/recommended-articles'

export default {
  title: 'poi-detail / RecommendedArticles',
  component: RecommendedArticles,
} as ComponentMeta<typeof RecommendedArticles>

export const Basic: ComponentStoryObj<typeof RecommendedArticles> = {
  args: {
    appInstallationCta: {
      inventoryId: 'app-install-cta-footer-hotel-v1',
      href: 'https://triple-dev.titicaca-corp.com',
    },
    regionId: '23c5965b-01ad-486b-a694-a2ced15f245c',
  },
}

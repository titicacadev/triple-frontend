import { RecommendedArticles } from '@titicaca/poi-detail'
import { ComponentStoryObj, Meta } from '@storybook/react'

import {
  historyProviderDecorator,
  userAgentProviderDecorator,
  eventTrackingProviderDecorator,
} from '../../decorators'

export default {
  title: 'poi-detail / RecommendedArticles',
  component: RecommendedArticles,
  decorators: [
    historyProviderDecorator,
    userAgentProviderDecorator,
    eventTrackingProviderDecorator,
  ],
} as Meta

export const Basic: ComponentStoryObj<typeof RecommendedArticles> = {
  name: '일반',
  args: {
    appInstallationCta: {
      inventoryId: 'app-install-cta-footer-hotel-v1',
      href: 'https://triple-dev.titicaca-corp.com',
    },
    regionId: '23c5965b-01ad-486b-a694-a2ced15f245c',
  },
}

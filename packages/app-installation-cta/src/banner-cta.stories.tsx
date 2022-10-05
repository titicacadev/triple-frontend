import { ComponentStoryObj, Meta } from '@storybook/react'

import BannerCTA from './banner-cta'

export default {
  title: 'app-installation-cta / BannerCTA',
  component: BannerCTA,
} as Meta

export const Basic: ComponentStoryObj<typeof BannerCTA> = {
  name: '배너 CTA',
  args: {
    inventoryId: 'app-install-cta-tna-v1',
    installUrl: 'https://triple-dev.titicaca-corp.com',
    disableTextBanner: true,
  },
}

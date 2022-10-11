import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import BannerCTA from './banner-cta'

export default {
  title: 'app-installation-cta / BannerCTA',
  component: BannerCTA,
} as ComponentMeta<typeof BannerCTA>

export const Basic: ComponentStoryObj<typeof BannerCTA> = {
  args: {
    inventoryId: 'app-install-cta-poi-v1',
    installUrl: 'https://triple-dev.titicaca-corp.com',
  },
}

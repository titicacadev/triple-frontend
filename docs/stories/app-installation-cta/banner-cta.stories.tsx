import { BannerCTA } from '@titicaca/app-installation-cta'
import { ComponentStoryObj, Meta } from '@storybook/react'

export default {
  title: 'app-installation-cta / BannerCTA',
  component: BannerCTA,
} as Meta

export const Basic: ComponentStoryObj<typeof BannerCTA> = {
  name: '배너 CTA',
  args: {
    inventoryId: 'app-install-cta-poi-v1',
    installUrl: 'https://triple-dev.titicaca-corp.com',
  },
}

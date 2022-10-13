import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import BannerCTA from './banner-cta'

export default {
  title: 'app-installation-cta / BannerCTA',
  component: BannerCTA,
} as ComponentMeta<typeof BannerCTA>

// TODO: 서버에 데이터가 없어서 mocking 해야 할 듯
export const Basic: ComponentStoryObj<typeof BannerCTA> = {
  args: {
    inventoryId: 'app-install-cta-tna-v1',
    installUrl: 'https://triple-dev.titicaca-corp.com',
    disableTextBanner: true,
  },
}

import { ComponentStoryObj, Meta } from '@storybook/react'

import ImageBanner from './image-banner'

export default {
  title: 'app-installation-cta / ImageBanner',
  component: ImageBanner,
} as Meta

export const Basic: ComponentStoryObj<typeof ImageBanner> = {
  args: {
    imgUrl: '',
    installUrl: 'https://triple-dev.titicaca-corp.com',
  },
}

import type { Meta, StoryObj } from '@storybook/react'

import { ImageBanner } from './image-banner'

export default {
  title: 'tds-widget / app-installation-cta / ImageBanner',
  component: ImageBanner,
} as Meta

export const Basic: StoryObj<typeof ImageBanner> = {
  args: {
    // TODO: 이미지 추가하면 좋을 것 같은데 어떤 이미지를 써야할지 모르겠음
    imgUrl: '',
    installUrl: 'https://triple-dev.titicaca-corp.com',
  },
}

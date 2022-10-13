import { ComponentStoryObj, Meta } from '@storybook/react'

import ImageBanner from './image-banner'

export default {
  title: 'app-installation-cta / ImageBanner',
  component: ImageBanner,
} as Meta

export const Basic: ComponentStoryObj<typeof ImageBanner> = {
  args: {
    // TODO: 이미지 추가하면 좋을 것 같은데 어떤 이미지를 써야할지 모르겠음
    imgUrl: '',
    installUrl: 'https://triple-dev.titicaca-corp.com',
  },
}

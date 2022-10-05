import { ComponentStoryObj, Meta } from '@storybook/react'

import ImageBanner from './image-banner'

export default {
  title: 'app-installation-cta / AppInstallationCTA',
  component: ImageBanner,
} as Meta

export const Basic: ComponentStoryObj<typeof ImageBanner> = {
  name: '트리플 앱 설치하기 ',
  args: {
    imgUrl: '',
    installUrl: 'https://triple-dev.titicaca-corp.com',
  },
}

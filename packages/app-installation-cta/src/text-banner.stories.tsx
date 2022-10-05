import { ComponentStoryObj, Meta } from '@storybook/react'

import TextBanner from './text-banner'

export default {
  title: 'app-installation-cta / TextBanner',
  component: TextBanner,
} as Meta

export const Basic: ComponentStoryObj<typeof TextBanner> = {
  name: '텍스트 배너',
  args: {
    message: '앱 다운로드시 가이드북 무료',
    installUrl: 'https://triple-dev.titicaca-corp.com',
  },
}

import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import TextBanner from './text-banner'

export default {
  title: 'app-installation-cta / TextBanner',
  component: TextBanner,
} as ComponentMeta<typeof TextBanner>

export const Basic: ComponentStoryObj<typeof TextBanner> = {
  args: {
    message: '앱 다운로드시 가이드북 무료',
    installUrl: 'https://triple-dev.titicaca-corp.com',
  },
}

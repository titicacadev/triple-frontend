import type { Meta, StoryObj } from '@storybook/react'

import { TextBanner } from './text-banner'

export default {
  title: 'app-installation-cta / TextBanner',
  component: TextBanner,
} as Meta<typeof TextBanner>

export const Basic: StoryObj<typeof TextBanner> = {
  args: {
    message: '앱 다운로드시 가이드북 무료',
    installUrl: 'https://triple-dev.titicaca-corp.com',
  },
}

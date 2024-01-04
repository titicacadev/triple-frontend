import type { StoryObj } from '@storybook/react'

import { RollingSpinner } from './rolling-spinner'

const meta = {
  title: 'tds-ui / Spinner / RollingSpinner',
  component: RollingSpinner,
  args: {
    size: 36,
    duration: 50,
  },
  argTypes: {
    size: { type: 'number' },
    duration: { type: 'number' },
    zTier: { type: 'number' },
    zIndex: { type: 'number' },
  },
  parameters: {
    docs: {
      description: {
        component:
          '사용자에게 데이터를 불러오고 있음을 알려주는 뷰 컴포넌트입니다.',
      },
      story: {
        inline: false,
        iframeHeight: 300,
      },
    },
  },
}

export default meta

export const Default: StoryObj<typeof RollingSpinner> = {
  args: {
    imageUrls: [
      'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/7C.png',
      'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/TW.png',
      'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/AC.png',
    ],
  },
}

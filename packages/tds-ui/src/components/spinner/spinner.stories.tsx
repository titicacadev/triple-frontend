import type { StoryObj } from '@storybook/react'

import { RollingSpinner } from './rolling-spinner'
import { Spinner } from './spinner'

const meta = {
  title: 'tds-ui / Spinner',
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

export const Default: StoryObj<typeof Spinner> = {
  name: '기본',
  args: {
    full: false,
  },
  render: (args) => {
    return <Spinner {...args} />
  },
}

export const Rolling: StoryObj<typeof RollingSpinner> = {
  name: '롤링',
  args: {
    imageUrls: [
      'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/7C.png',
      'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/TW.png',
      'https://triple-dev.titicaca-corp.com/air/static/images/airline-logos/AC.png',
    ],
    duration: 50,
    size: 36,
  },
  render: (args) => {
    return <RollingSpinner {...args} />
  },
}

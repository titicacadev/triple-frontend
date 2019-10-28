import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'

import AdBanners from '@titicaca/ad-banners'

const banners = [
  {
    id: '1',
    desc: '설명',
    image:
      'https://media.triple.guide/triple-dev/a707bf40-bab7-4c96-bcd0-e1a73ab57028.jpg',
    target: '',
  },
  {
    id: '2',
    desc: '설명',
    image:
      'https://media.triple.guide/triple-dev/45eb9535-85a3-49b9-b76c-cd627fc13f0e.jpg',
    target: '',
  },
]

storiesOf('AdBanners', module).add('광고 배너 목록', () => (
  <AdBanners
    banners={banners}
    padding={{
      left: number('섹션 왼쪽 패딩'),
      right: number('섹션 오른쪽 패딩'),
    }}
    bannerMargin={{
      top: number('배너 위쪽 마진'),
      bottom: number('배너 아래쪽 마진'),
    }}
  />
))

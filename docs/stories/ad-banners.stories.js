import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, text, select, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import {
  HistoryProvider,
  EventTrackingProvider,
  DeviceProvider,
} from '@titicaca/react-contexts'
import AdBanners, { HorizontalAdBanners } from '@titicaca/ad-banners'

const CONTENT_TYPE_SET = {
  article: 'article',
  attraction: 'attraction',
  hotel: 'hotel',
  restaurant: 'restaurant',
}

const BANNERS = [
  {
    id: '1',
    desc: '배너 1 설명',
    image:
      'https://media.triple.guide/triple-dev/a707bf40-bab7-4c96-bcd0-e1a73ab57028.jpg',
    target: 'https://www.naver.com',
  },
  {
    id: '2',
    desc: '배너 2 설명',
    image:
      'https://media.triple.guide/triple-dev/ce75e06a-7061-4038-bca1-872020202d3f.jpg',
    target: 'https://www.naver.com',
  },
]

storiesOf('AdBanners', module)
  .add('광고 배너 목록', () => (
    <DeviceProvider
      value={{
        inRegion: boolean('inRegion', true),
        latitude: number('위도', 13.471778),
        longitude: number('경도', 144.812304),
      }}
    >
      <EventTrackingProvider
        pageLabel="광고 배너 테스트"
        trackEvent={action('이벤트 트래킹')}
        trackScreen={action('스크린 트래킹')}
        viewItem={action('viewItem')}
      >
        <HistoryProvider>
          <AdBanners
            contentType={select(
              '콘텐츠 타입',
              CONTENT_TYPE_SET,
              CONTENT_TYPE_SET['attraction'],
            )}
            contentId={text(
              '콘텐츠 ID',
              '81977f84-ddd0-4112-8057-6cc9dab9aa70',
            )}
            regionId={text('리전 ID', 'ea2b52ff-9cdb-4028-9442-7a8defd13af9')}
            padding={{
              left: number('섹션 왼쪽 패딩'),
              right: number('섹션 오른쪽 패딩'),
            }}
            eventAttributes={{ title: '콘텐츠 제목' }}
          />
        </HistoryProvider>
      </EventTrackingProvider>
    </DeviceProvider>
  ))
  .add('가로형 광고 배너 목록', () => (
    <HorizontalAdBanners
      banners={BANNERS}
      onIntersectingBanner={action('배너 표시 이벤트')}
      onClickBanner={action('배너 클릭 이벤트')}
      padding={{
        left: number('섹션 왼쪽 패딩'),
        right: number('섹션 오른쪽 패딩'),
      }}
    />
  ))

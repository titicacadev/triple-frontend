import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, text, select, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

import {
  HistoryProvider,
  EventTrackingProvider,
  DeviceProvider,
} from '@titicaca/react-contexts'
import AdBanners from '@titicaca/ad-banners'

const CONTENT_TYPE_SET = {
  article: 'article',
  attraction: 'attraction',
  hotel: 'hotel',
  restaurant: 'restaurant',
}

storiesOf('AdBanners', module).add('광고 배너 목록', () => (
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
          contentId={text('콘텐츠 ID', '81977f84-ddd0-4112-8057-6cc9dab9aa70')}
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

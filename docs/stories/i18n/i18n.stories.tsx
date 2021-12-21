import React from 'react'
import I18nProvider from '@titicaca/i18n/lib/provider'
import NearbyPois from '@titicaca/nearby-pois'
import { select } from '@storybook/addon-knobs'

export default {
  title: 'i18n / I18nProvider',
}

export function ComponentWithI18nProvider() {
  return (
    <I18nProvider language={select('언어', ['ko', 'en', 'zh-TW'], 'en')}>
      <NearbyPois
        poiId="a86a3f55-9f89-4540-a124-f8c4db07ab34"
        geolocation={{
          type: 'Point',
          coordinates: [125.50129726256557, 34.668727308992935],
        }}
        regionId="71476976-cf9a-4ae8-a60f-76e6fb26900d"
      />
    </I18nProvider>
  )
}

ComponentWithI18nProvider.storyName = '다국어 지원'

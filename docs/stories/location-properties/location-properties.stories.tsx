import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { boolean } from '@storybook/addon-knobs'
import { HistoryProvider } from '@titicaca/react-contexts'
import LocationProperties from '@titicaca/location-properties'

storiesOf('Location-Properties | LocationProperties', module).add(
  '기본',
  () => (
    <HistoryProvider>
      <LocationProperties
        addresses={
          boolean('주소 있음', true)
            ? {
                primary: null,
                ko: null,
                en: '1-1 Maihama, Urayasu, Chiba Prefecture 279-0031',
                local: '〒279-0031 東京都千葉県浦安市舞浜11',
              }
            : undefined
        }
        onAddressesClick={action('onAddressesClick')}
        phoneNumber={
          boolean('전화번호 있음', true) ? '+81453305211' : undefined
        }
        onPhoneNumberClick={action('onPhoneNumberClick')}
        officialSiteUrl={
          boolean('홈페이지 있음', true)
            ? 'http://www.tokyodisneyresort.jp/tdl/index.html'
            : undefined
        }
        onOfficialSiteUrlClick={action('onOfficialSiteUrlClick')}
        extraProperties={
          boolean('추가속성 있음', true)
            ? [
                {
                  description: '내비게이션용 맵코드',
                  value: '349 569 814*88',
                },
              ]
            : undefined
        }
        onExtraPropertyClick={action('onExtraPropertyClick')}
      />
    </HistoryProvider>
  ),
)

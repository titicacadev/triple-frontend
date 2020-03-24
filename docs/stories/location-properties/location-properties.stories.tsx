import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { HistoryProvider } from '@titicaca/react-contexts'
import LocationProperties from '@titicaca/location-properties'

storiesOf('Location-Properties | LocationProperties', module).add(
  '기본',
  () => (
    <HistoryProvider>
      <LocationProperties
        addresses={{
          primary: null,
          ko: null,
          en: '1-1 Maihama, Urayasu, Chiba Prefecture 279-0031',
          local: '〒279-0031 東京都千葉県浦安市舞浜11',
        }}
        onAddressesClick={action('onAddressesClick')}
        phoneNumber="+81453305211"
        onPhoneNumberClick={action('onPhoneNumberClick')}
        officialSiteUrl="http://www.tokyodisneyresort.jp/tdl/index.html"
        onOfficialSiteUrlClick={action('onOfficialSiteUrlClick')}
        extraProperties={[
          {
            description: '내비게이션용 맵코드',
            value: '349 569 814*88',
          },
        ]}
        onExtraPropertyClick={action('onExtraPropertyClick')}
      />
    </HistoryProvider>
  ),
)

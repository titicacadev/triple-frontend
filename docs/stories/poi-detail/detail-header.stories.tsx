import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { DetailHeader } from '@titicaca/poi-detail'
import { HistoryProvider } from '@titicaca/react-contexts'

storiesOf('poi-detail | DetailHeader', module).add('일반', () => (
  <HistoryProvider
    appUrlScheme="dev-soto"
    webUrlBase="https://triple-dev.titicaca-corp.com"
  >
    <DetailHeader
      names={{
        primary: '도쿄 디즈니 랜드',
        ko: '도쿄 디즈니 랜드',
        en: 'Tokyo Disney land',
        local: '東京ディズニーランド',
      }}
      scrapsCount={number('저장수', 682)}
      reviewsCount={number('리뷰수', 13859)}
      reviewsRating={number('리뷰평점', 4.45)}
      onReviewsRatingClick={action('onReviewsRatingClick')}
    />
  </HistoryProvider>
))

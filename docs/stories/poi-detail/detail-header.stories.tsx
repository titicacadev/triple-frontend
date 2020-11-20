import React from 'react'
import { number, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { DetailHeader } from '@titicaca/poi-detail'
import { UserAgentProvider } from '@titicaca/react-contexts'
import { StoryFn } from '@storybook/addons'

import { historyProviderDecorator } from '../../decorators'

export default {
  title: 'poi-detail | DetailHeader',
  decorators: [
    historyProviderDecorator,
    (storyFn: StoryFn<JSX.Element>) => (
      <UserAgentProvider
        value={{
          isPublic: boolean('isPublic', true),
          isMobile: true,
          os: {},
          app: null,
        }}
      >
        {storyFn()}
      </UserAgentProvider>
    ),
  ],
}

export function baseExample() {
  return (
    <DetailHeader
      names={{
        primary: '도쿄 디즈니 랜드',
        ko: '도쿄 디즈니 랜드',
        en: 'Tokyo Disney land',
        local: '東京ディズニーランド',
      }}
      areas={[
        { id: 1, name: '도쿄' },
        { id: 2, name: '오사카' },
      ]}
      scrapsCount={number('저장수', 682)}
      reviewsCount={number('리뷰수', 13859)}
      reviewsRating={number('리뷰평점', 4.45)}
      onReviewsRatingClick={action('onReviewsRatingClick')}
      onCopy={action('onCopy')}
    />
  )
}

baseExample.story = { name: '기본' }

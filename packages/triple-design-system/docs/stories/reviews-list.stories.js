import React from 'react'

import { ReviewsList } from '@titicaca/triple-design-system'

import { storiesOf } from '@storybook/react'

import Reviews from './reviews-list.sample.json'

storiesOf('ReviewsList', module).add('일반', () => (
  <ReviewsList
    reviews={Reviews}
    onUnfoldButtonClick={() => {
      console.log('더보기')
    }}
  />
))

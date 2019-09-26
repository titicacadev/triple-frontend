import React from 'react'

import ReviewsPlaceholder from '@titicaca/review/lib/review-placeholder-with-rating'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

storiesOf('ReviewsList', module).add('플레이스홀더', () => (
  <ReviewsPlaceholder
    resourceType="article"
    appUrlScheme="triple"
    onClick={action('clicked')}
  />
))

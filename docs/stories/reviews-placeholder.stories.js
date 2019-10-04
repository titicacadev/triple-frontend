import React from 'react'

import ReviewsPlaceholder from '@titicaca/review/lib/review-placeholder-with-rating'
import { storiesOf } from '@storybook/react'
import { select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

storiesOf('Reviews', module).add('플레이스홀더', () => (
  <ReviewsPlaceholder
    resourceType={select(
      'Resource Type',
      ['poi', 'tna', 'article', 'hotel', 'default'],
      'tna',
    )}
    appUrlScheme="triple"
    onClick={action('clicked')}
  />
))

import React from 'react'
import ReviewsPlaceholder from '@titicaca/review/lib/review-placeholder-with-rating'
import { select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'

export default {
  title: 'Reviews | Review Placeholder',
}

export function reviewPlaceholder() {
  return (
    <ReviewsPlaceholder
      resourceType={select(
        'Resource Type',
        ['poi', 'tna', 'article', 'hotel', 'default'],
        'tna',
      )}
      onClick={action('clicked')}
    />
  )
}

reviewPlaceholder.storyName = '플레이스홀더'

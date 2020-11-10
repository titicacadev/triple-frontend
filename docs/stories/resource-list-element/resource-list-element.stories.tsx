import React from 'react'
import { storiesOf } from '@storybook/react'
import { number } from '@storybook/addon-knobs'
import {
  ReviewScrapStat,
  ResourceListElementStats,
} from '@titicaca/resource-list-element'

storiesOf('resource-list-element | resource-list-element', module)
  .add('ReviewScrapStat', () => (
    <ReviewScrapStat
      id="MOCK_ID"
      scraped={false}
      reviewsCount={number('reviewsCount', 2)}
      scrapsCount={number('scrapsCount', 0)}
      reviewsRating={number('reviewsRating', 3.7, { min: 1, max: 5 })}
    />
  ))
  .add('ResourceListElementStats', () => (
    <ResourceListElementStats>
      <span>볼거리</span>
      <span>판교</span>
    </ResourceListElementStats>
  ))

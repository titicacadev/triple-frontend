import React from 'react'
import { storiesOf } from '@storybook/react'
import { number, array } from '@storybook/addon-knobs'
import {
  ReviewScrapStat,
  ResourceListElementStats,
} from '@titicaca/resource-list-element'

storiesOf('resource-list-element | resource-list-element', module)
  .add('ReviewScrapStat', () => (
    <ReviewScrapStat
      reviewsCount={number('reviewsCount', 2)}
      scrapsCount={number('scrapsCount', 0)}
      reviewsRating={number('reviewsRating', 3.7, { min: 1, max: 5 })}
    />
  ))
  .add('ResourceListElementStats', () => (
    <ResourceListElementStats stats={array('stats', ['볼거리', '판교'])} />
  ))

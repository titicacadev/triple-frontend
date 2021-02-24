import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Actions } from '@titicaca/poi-detail'

storiesOf('poi-detail / Actions', module)
  .add('일반', () => (
    <Actions
      poiId="e889ae22-0336-4cf9-8fbb-742b95fd09d0"
      scraped={boolean('저장', false)}
      reviewed={boolean('리뷰', false)}
      onScheduleAdd={action('onScheduleAdd')}
      onScrapedChange={action('onScrapedChange')}
      onContentShare={action('onContentShare')}
      onReviewEdit={action('onReviewEdit')}
    />
  ))
  .add('호텔 (Global)', () => (
    <Actions
      poiId="e889ae22-0336-4cf9-8fbb-742b95fd09d0"
      scraped={boolean('저장', false)}
      reviewed={boolean('리뷰', false)}
      onContentShare={action('onContentShare')}
      onReviewEdit={action('onReviewEdit')}
    />
  ))

import React from 'react'
import { storiesOf } from '@storybook/react'
import { boolean, select } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Actions } from '@titicaca/poi-detail'

storiesOf('poi-detail | Actions', module)
  .add('일반', () => (
    <Actions
      scrapableResource={{
        id: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
        type: select('type', ['attraction', 'restaurant'], 'attraction'),
        scraped: boolean('저장', false),
      }}
      reviewed={boolean('리뷰', false)}
      onScheduleAdd={action('onScheduleAdd')}
      onContentShare={action('onContentShare')}
      onReviewEdit={action('onReviewEdit')}
    />
  ))
  .add('호텔 (Global)', () => (
    <Actions
      scrapableResource={{
        id: 'e889ae22-0336-4cf9-8fbb-742b95fd09d0',
        type: 'hotel',
        scraped: boolean('저장', false),
      }}
      reviewed={boolean('리뷰', false)}
      onContentShare={action('onContentShare')}
      onReviewEdit={action('onReviewEdit')}
    />
  ))

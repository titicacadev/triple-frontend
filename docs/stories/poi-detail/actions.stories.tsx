import React from 'react'
import { boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { Actions } from '@titicaca/poi-detail'

export default {
  title: 'poi-detail / Actions',
  component: Actions,
}

export const Basic = () => {
  return (
    <Actions
      poiId="e889ae22-0336-4cf9-8fbb-742b95fd09d0"
      scraped={boolean('저장', false)}
      reviewed={boolean('리뷰', false)}
      onScheduleAdd={action('onScheduleAdd')}
      onScrapedChange={action('onScrapedChange')}
      onContentShare={action('onContentShare')}
      onReviewEdit={action('onReviewEdit')}
    />
  )
}
Basic.storyName = '일반'

export const GlobalHotel = () => {
  return (
    <Actions
      poiId="e889ae22-0336-4cf9-8fbb-742b95fd09d0"
      scraped={boolean('저장', false)}
      reviewed={boolean('리뷰', false)}
      onContentShare={action('onContentShare')}
      onReviewEdit={action('onReviewEdit')}
    />
  )
}
GlobalHotel.storyName = '호텔 (Global)'

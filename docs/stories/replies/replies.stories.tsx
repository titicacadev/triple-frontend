import React from 'react'
import { action } from '@storybook/addon-actions'
import Replies from '@titicaca/replies'

export default {
  title: 'Replies',
}

export function RepliesStory() {
  return (
    <Replies
      resourceId="14a66dcf-b170-4edf-967b-b830d2362109"
      resourceType="itinerary"
      onClick={action('onClick 적용된 아이콘, 버튼 클릭')}
    />
  )
}

RepliesStory.storyName = '기본 댓글'

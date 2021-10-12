import React from 'react'
import Reply from '@titicaca/reply'
import { action } from '@storybook/addon-actions'

import {
  itinerary as ItineraryData,
  reactions as ReactionsData,
  reply as ReplyData,
} from '../__mocks__/reply.sample.json'

export default {
  title: 'Reply',
}

export function Replies() {
  return (
    <Reply
      itinerary={ItineraryData}
      reactions={ReactionsData}
      reply={ReplyData}
      onClick={action('onClick 적용된 아이콘, 버튼 클릭')}
    />
  )
}

Replies.storyName = '기본 댓글'

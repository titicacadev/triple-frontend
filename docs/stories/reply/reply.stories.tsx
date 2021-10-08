import React from 'react'
import Reply from '@titicaca/reply'

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
      onClick={() => alert('onClick 옵션을 custom하게 사용하세요.')}
    />
  )
}

Replies.storyName = '기본 댓글'

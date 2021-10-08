import React from 'react'
import Reply from '@titicaca/reply'
import { text } from '@storybook/addon-knobs'

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
      onClick={() => alert(text('알림 내용 ', 'onClick 테스트'))}
    />
  )
}

Replies.storyName = '기본 댓글'

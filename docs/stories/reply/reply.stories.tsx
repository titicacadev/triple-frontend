import React from 'react'
import Reply from '@titicaca/reply'
import {
  TransitionModal,
  TransitionType,
  useTransitionModal,
} from '@titicaca/modals'

import {
  itinerary as ItineraryData,
  reactions as ReactionsData,
  reply as ReplyData,
} from '../__mocks__/reply.sample.json'
import { historyProviderDecorator } from '../../decorators'

export default {
  title: 'Reply',
}

export function Replies() {
  const { show } = useTransitionModal()

  return (
    <>
      <Reply
        itinerary={ItineraryData}
        reactions={ReactionsData}
        reply={ReplyData}
        onClick={() => show(TransitionType.General)}
      />
      <TransitionModal deepLink="" />
    </>
  )
}

Replies.storyName = '기본 댓글'
Replies.decorators = [historyProviderDecorator]

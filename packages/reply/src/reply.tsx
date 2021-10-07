import React from 'react'
import styled from 'styled-components'
import { Image } from '@titicaca/core-elements'

import Reactions from './reactions'
import UserList from './user-list'
import Comment from './comment'
import { Itinerary, Reaction, Reply as ReplyType } from './types'

export const ImageIcon = styled(Image.Img)<{
  isMoreIcon?: boolean
}>`
  position: relative;
  width: ${({ isMoreIcon }) => `${isMoreIcon ? 25 : 19}px`};
  height: ${({ isMoreIcon }) => `${isMoreIcon ? 25 : 19}px`};

  padding-right: ${({ isMoreIcon }) => !isMoreIcon && '3px'};
`

export const THANKS_IMAGE_URL =
  'https://assets.triple.guide/images/btn-lounge-thanks-off@3x.png'

export const COMMENT_IMAGE_URL =
  'https://assets.triple.guide/images/btn-lounge-comment-off@3x.png'

export default function Reply({
  reactions,
  itinerary,
  reply,
  onClick,
}: {
  reactions: Reaction
  itinerary: Pick<
    Itinerary,
    'applicationCount' | 'createdAt' | 'replyBoard' | 'reactions'
  >
  reply: ReplyType[]
  onClick: () => void
}) {
  const { totalCount = 0 } = reactions || {}

  return (
    <>
      <Reactions itinerary={itinerary} onClick={onClick} />

      {totalCount > 0 ? (
        <UserList
          reactions={reactions}
          totalCount={totalCount}
          onClick={onClick}
        />
      ) : null}

      <Comment reply={reply} onClick={onClick} />
    </>
  )
}

import React from 'react'

import Comment from './comment'
import { Reply as ReplyType } from './types'

export default function Reply({
  reply,
  onClick,
}: {
  reply: ReplyType[]
  onClick: () => void
}) {
  return <Comment reply={reply} onClick={onClick} />
}

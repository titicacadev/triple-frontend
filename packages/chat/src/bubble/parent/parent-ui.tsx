import { MetaDataInterface } from '../../types'
import {
  DEFAULT_MAX_USERNAME_LENGTH,
  formatUsername,
} from '../../utils/profile'

import ParentMessage from './parent-message'

export interface TextParentMessage {
  id: string
  type: 'text'
  value: {
    message: string
    sender: { name: string; unregistered: boolean }
  }
}

export interface ImageParentMessage {
  id: string
  type: 'image'
  value: {
    images: MetaDataInterface[]
    sender: { name: string; unregistered: boolean }
  }
}

export type ParentMessageUIProp = (TextParentMessage | ImageParentMessage) & {
  blinded: boolean
}

export default function ParentMessageUI({
  id,
  type,
  value,
  blinded,
}: ParentMessageUIProp) {
  const { sender } = value

  const senderName = formatUsername({
    name: sender.name,
    unregistered: sender.unregistered,
    maxLength: DEFAULT_MAX_USERNAME_LENGTH,
  })

  if (blinded) {
    return (
      <ParentMessage
        id={id}
        text="삭제된 메세지입니다."
        senderName={senderName}
      />
    )
  }

  if (type === 'text') {
    return (
      <ParentMessage id={id} senderName={senderName} text={value.message} />
    )
  } else {
    return (
      <ParentMessage
        id={id}
        senderName={senderName}
        text="사진"
        previewImageUrl={value.images[0]?.sizes.large.url}
      />
    )
  }
}

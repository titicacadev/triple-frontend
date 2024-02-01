import { MetaDataInterface, UserInterface } from '../../types'
import {
  DEFAULT_MAX_USERNAME_LENGTH,
  formatUsername,
} from '../../utils/profile'

import ParentMessage from './parent-message'

interface ParentMessageInterface {
  id: string
  sender: UserInterface
}
export interface TextParentMessage extends ParentMessageInterface {
  type: 'text'
  value: {
    message: string
  }
}

export interface ImageParentMessage extends ParentMessageInterface {
  type: 'image'
  value: {
    images: MetaDataInterface[]
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
  sender,
}: ParentMessageUIProp) {
  const senderName = formatUsername({
    name: sender.profile.name,
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

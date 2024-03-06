import { MouseEvent } from 'react'
import { CSSProp } from 'styled-components'

import { MetaDataInterface, UserInterface } from '../../types'
import {
  DEFAULT_MAX_USERNAME_LENGTH,
  formatUsername,
} from '../../utils/profile'
import { ALTERNATIVE_TEXT_MESSAGE } from '../constants'

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
  deleted: boolean
  style?: { css?: CSSProp; titleColor?: string; previewTextColor?: string }
  onClick?: (e: MouseEvent<Element>, id: string) => void
}

export default function ParentMessageUI({
  id,
  type,
  value,
  blinded,
  deleted,
  sender,
  style,
  ...props
}: ParentMessageUIProp) {
  const senderName = formatUsername({
    name: sender.profile.name,
    unregistered: sender.unregistered,
    maxLength: DEFAULT_MAX_USERNAME_LENGTH,
  })

  if (blinded || deleted || sender.unfriended) {
    return (
      <ParentMessage
        id={id}
        text={getTextPreview({
          deleted,
          blinded,
          unfriended: sender.unfriended,
        })}
        senderName={senderName}
        previewTextColor={style?.previewTextColor}
        titleColor={style?.titleColor}
        css={style?.css}
        {...props}
      />
    )
  }

  if (type === 'text') {
    return (
      <ParentMessage
        id={id}
        senderName={senderName}
        text={value.message}
        previewTextColor={style?.previewTextColor}
        titleColor={style?.titleColor}
        css={style?.css}
        {...props}
      />
    )
  } else {
    return (
      <ParentMessage
        id={id}
        senderName={senderName}
        text="사진"
        previewImageUrl={value.images[0]?.sizes.large.url}
        previewTextColor={style?.previewTextColor}
        titleColor={style?.titleColor}
        css={style?.css}
        {...props}
      />
    )
  }
}

function getTextPreview({
  deleted,
  blinded,
  unfriended,
}: {
  deleted?: boolean
  blinded?: boolean
  unfriended?: boolean
}) {
  if (unfriended) {
    return ALTERNATIVE_TEXT_MESSAGE.unfriended
  } else if (blinded) {
    return ALTERNATIVE_TEXT_MESSAGE.blinded
  } else if (deleted) {
    return ALTERNATIVE_TEXT_MESSAGE.deleted
  }
  return ''
}

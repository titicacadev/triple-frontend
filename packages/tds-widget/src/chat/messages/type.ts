import {
  ImageBubbleUIProp,
  ProductBubbleUIProp,
  RichBubbleUIProp,
  TextBubbleUIProp,
} from '../bubble/bubble-ui'
import { ChatUser } from '../types'

export interface MessageBase<User extends ChatUser> {
  id: string | number
  sender: User
  createdAt?: string
  blinded?: boolean
  deleted?: boolean
  thanks?: { count: number; haveMine: boolean }
}

export type MessageInterface<
  Message extends MessageBase<User>,
  User extends ChatUser,
> = Message &
  (
    | TextBubbleUIProp
    | ImageBubbleUIProp
    | RichBubbleUIProp
    | ProductBubbleUIProp
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { type: string; value?: any }
  )

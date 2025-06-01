import {
  ButtonBubbleUIProp,
  CouponBubbleUIProp,
  ImageBubbleUIProp,
  ProductBubbleUIProp,
  RichBubbleUIProp,
  TextBubbleUIProp,
} from '../bubble/bubble-ui'
import { UserInterface } from '../types/user'
import { NolBubbleUIProps } from '../bubble/nol/bubble-ui'

export interface MessageBase<User extends UserInterface> {
  id: string | number
  sender: User
  createdAt?: string
  blinded?: boolean
  deleted?: boolean
  thanks?: { count: number; haveMine: boolean }
  extra?: Record<string, unknown>
}

export type MessageInterface<
  Message extends MessageBase<User>,
  User extends UserInterface,
> = Message &
  (
    | TextBubbleUIProp
    | ImageBubbleUIProp
    | RichBubbleUIProp
    | ProductBubbleUIProp
    | CouponBubbleUIProp
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { type: string; value?: any }
  )

export type BubbleMessageInterface<
  Message extends MessageBase<User>,
  User extends UserInterface,
> = Message &
  (
    | TextBubbleUIProp
    | ImageBubbleUIProp
    | RichBubbleUIProp
    | ProductBubbleUIProp
    | ButtonBubbleUIProp
    | NolBubbleUIProps
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | { type: string; value?: any }
  )

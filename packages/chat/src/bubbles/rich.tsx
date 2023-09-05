import styled from 'styled-components'

import { useChat } from '../chat'
import {
  MetaDataInterface,
  MessageType,
  ButtonPayload,
  TextPayload,
  ImagePayload,
} from '../types'
import { BackgroundColor } from '../types/ui'

import { ImageBubble } from './image'
import { TextBubble } from './text'

const Button = styled.a`
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 11px 10px 11px 12px;
  margin: 14px 0 16px;
  border-radius: 4px;
  background-color: #fff;
  color: inherit;
  text-decoration: none;

  &::after {
    display: block;
    float: right;
    width: 16px;
    height: 18px;
    content: '';
    background-image: url('http://assets.triple.guide/images/ico-arrow-right-black@3x.png');
    background-size: 16px 18px;
  }
`

export function RichBubble({
  my,
  items,
  bubbleStyle,
}: {
  my: boolean
  items: (TextPayload | ImagePayload | ButtonPayload)[]
  bubbleStyle?: {
    backgroundColor: BackgroundColor
    textColor: string
    linkColor?: string
    linkUnderline?: boolean
  }
}) {
  const {
    textBubbleFontSize,
    textBubbleMaxWidthOffset,
    onRichBubbleButtonBeforeRouting: onButtonBeforeRouting,
  } = useChat()

  return (
    <TextBubble
      my={my}
      size={textBubbleFontSize}
      maxWidthOffset={textBubbleMaxWidthOffset}
      margin={my ? { left: 8 } : undefined}
      bubbleStyle={bubbleStyle}
    >
      {items.map((item, index) => {
        switch (item.type) {
          case MessageType.TEXT:
            return <div key={index}>{item.message}</div>
          case MessageType.IMAGES:
            return (
              <ImageBubble key={index} isRichBubble imageInfos={item.images} />
            )
          case MessageType.BUTTON:
            return (
              <Button
                key={index}
                href={item.action.param}
                onClick={onButtonBeforeRouting}
              >
                {item.label}
              </Button>
            )
          default:
            return null
        }
      })}
    </TextBubble>
  )
}

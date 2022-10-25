import React from 'react'
import styled from 'styled-components'
import { GlobalSizes } from '@titicaca/core-elements'

import {
  MetaDataInterface,
  MessageType,
  ButtonPayload,
  TextPayload,
  ImagePayload,
} from '../types'

import { ImageBubble } from './image'
import { TextBubble } from './text'

const Button = styled.a`
  box-sizing: border-box;
  display: block;
  width: 100%;
  padding: 11px 10px 11px 12px;
  margin: 14px 0 16px 0;
  border-radius: 4px;
  background-color: #ffffff;
  color: inherit;
  text-decoration: none;

  &:after {
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
  textBubbleFontSize,
  textBubbleMaxWidthOffset,
  onButtonBeforeRouting,
  cloudinaryName,
  mediaUrlBase,
  onImageBubbleClick,
}: {
  my: boolean
  items: (TextPayload | ImagePayload | ButtonPayload)[]
  textBubbleFontSize: GlobalSizes | number
  textBubbleMaxWidthOffset: number
  onButtonBeforeRouting?: () => void
  cloudinaryName: string
  mediaUrlBase: string
  onImageBubbleClick: (imageInfos: MetaDataInterface[]) => void
}) {
  return (
    <TextBubble
      size={textBubbleFontSize}
      maxWidthOffset={textBubbleMaxWidthOffset}
      tailPosition={my ? 'right' : 'left'}
      backgroundColor={my ? 'blue' : 'gray'}
      margin={my ? { left: 8 } : undefined}
    >
      {items.map((item, index) => {
        switch (item.type) {
          case MessageType.TEXT:
            return <div key={index}>{item.message}</div>
          case MessageType.IMAGES:
            return (
              <ImageBubble
                key={index}
                isRichBubble
                imageInfos={item.images}
                cloudinaryName={cloudinaryName}
                mediaUrlBase={mediaUrlBase}
                onClick={onImageBubbleClick}
              />
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

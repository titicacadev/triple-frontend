import styled from 'styled-components'

import { useChat } from '../chat'
import { MessageType } from '../types'
import { generatePreviewImage } from '../utils'
import { ImageMessage } from '../message/image'
import { TextMessage } from '../message/text'

import { Bubble } from './bubble'
import { RichBubbleProp } from './type'

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
  items, // bubbleStyle,
  cloudinaryName,
  mediaUrlBase,
  onImageClick,
  textItemStyle,
  imageItemStyle,
  buttonItemStyle,
  ...props
}: RichBubbleProp) {
  const {
    textBubbleFontSize,
    textBubbleMaxWidthOffset,
    onRichBubbleButtonBeforeRouting: onButtonBeforeRouting,
  } = useChat()

  return (
    <Bubble
      my={my}
      maxWidthOffset={textBubbleMaxWidthOffset}
      css={{ margin: my ? '0 0 0 8px' : undefined, size: textBubbleFontSize }}
      {...props}
    >
      {items.map((item, index) => {
        switch (item.type) {
          case MessageType.TEXT:
            return <TextMessage text={item.message} css={textItemStyle} />
          case MessageType.IMAGES: {
            if (item.images.length === 0) {
              return null
            }
            const imageUrl = generatePreviewImage({
              imageInfo: item.images[0],
              cloudinaryName,
              mediaUrlBase,
            })
            return (
              <ImageMessage
                key={index}
                src={imageUrl}
                onClick={() => {
                  onImageClick?.(item.images)
                }}
                css={imageItemStyle}
              />
            )
          }
          case MessageType.BUTTON:
            return (
              <Button
                key={index}
                href={item.action.param}
                onClick={onButtonBeforeRouting}
                css={buttonItemStyle}
              >
                {item.label}
              </Button>
            )
          default:
            return null
        }
      })}
    </Bubble>
  )
}

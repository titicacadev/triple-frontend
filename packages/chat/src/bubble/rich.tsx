import styled, { CSSProp } from 'styled-components'
import { shouldForwardProp } from '@titicaca/core-elements'

import { generatePreviewImage } from '../utils'

import { ImageItem, TextItem } from './item'
import Bubble from './bubble'
import { RichBubbleProp } from './type'

const Button = styled.a.withConfig({
  shouldForwardProp,
})<{ css?: CSSProp }>`
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
  ${(props) => props.css}
`

export function RichBubble({
  my,
  blocks,
  cloudinaryName,
  mediaUrlBase,
  onImageClick,
  onButtonClickBeforeRouting,
  textItemStyle,
  imageItemStyle,
  buttonItemStyle,
  ...props
}: RichBubbleProp) {
  return (
    <Bubble my={my} css={{ margin: my ? '0 0 0 8px' : undefined }} {...props}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'text':
            return <TextItem text={block.message} css={textItemStyle} />
          case 'images': {
            if (block.images.length === 0) {
              return null
            }
            const imageUrl = generatePreviewImage({
              imageInfo: block.images[0],
              cloudinaryName,
              mediaUrlBase,
            })
            return (
              <ImageItem
                key={index}
                src={imageUrl}
                onClick={() => {
                  onImageClick?.(block.images)
                }}
                css={imageItemStyle}
              />
            )
          }
          case 'button':
            return (
              <Button
                key={index}
                href={block.action.param}
                onClick={onButtonClickBeforeRouting}
                css={buttonItemStyle}
              >
                {block.label}
              </Button>
            )
          default:
            return null
        }
      })}
    </Bubble>
  )
}

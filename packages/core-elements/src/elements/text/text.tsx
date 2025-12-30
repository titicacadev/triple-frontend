import { PropsWithChildren } from 'react'
import styled, { CSSProp } from 'styled-components'
import { Property } from 'csstype'
import { getColor, Color } from '@titicaca/color-palette'

import { MarginPadding, GlobalSizes, GetGlobalColor } from '../../commons'
import {
  KeyOfTextStyleMap,
  ellipsisMixin,
  marginMixin,
  maxLinesMixin,
  paddingMixin,
  textStyleMixin,
} from '../../mixins'
import { shouldForwardProp } from '../../utils/should-forward-prop'

function rgba({ color, alpha }: { color?: string; alpha?: number }) {
  return `rgba(${GetGlobalColor(color || 'gray')}, ${alpha || 1})`
}

export type TextProps = PropsWithChildren<{
  alpha?: number
  bold?: boolean
  center?: boolean
  color?: Color | string
  cursor?: Property.Cursor
  ellipsis?: boolean
  floated?: Property.Float
  inline?: boolean
  inlineBlock?: boolean
  letterSpacing?: number
  lineHeight?: number | string
  margin?: MarginPadding
  maxLines?: number
  padding?: MarginPadding
  size?: GlobalSizes | number
  strikethrough?: boolean
  textAlign?: Property.TextAlign
  textStyle?: KeyOfTextStyleMap
  underline?: boolean
  whiteSpace?: Property.WhiteSpace
  wordBreak?: Property.WordBreak
  css?: CSSProp
}>

export const Text = styled.div.withConfig({ shouldForwardProp })<TextProps>(
  (props) => ({
    boxSizing: 'border-box',
    overflowWrap: 'break-word',
    color: props.alpha
      ? rgba({ color: props.color, alpha: props.alpha })
      : `rgba(${getColor(props.color ?? 'gray')}) `,
    cursor: props.cursor,
    display: props.inlineBlock
      ? 'inline-block'
      : props.inline
      ? 'inline'
      : undefined,
    float: props.floated ?? 'none',
    fontWeight: props.bold ? 'bold' : 500,
    textAlign: props.textAlign
      ? props.textAlign
      : props.center
      ? 'center'
      : undefined,
    textDecoration: props.strikethrough
      ? 'line-through'
      : props.underline
      ? 'underline'
      : undefined,
    whiteSpace: props.whiteSpace ?? 'pre-line',
    wordBreak: props.wordBreak,
  }),
  marginMixin,
  paddingMixin,
  textStyleMixin,
  ellipsisMixin,
  maxLinesMixin,
  (props) => props.css,
)

interface TextTitleBaseProps {
  margin?: MarginPadding
}

const TextTitleBase = styled(Text)<TextTitleBaseProps>`
  line-height: 1.2;
  font-size: 24px;
  font-weight: bold;
  color: #3a3a3a;
  ${marginMixin}
`

export type TextTitleProps = PropsWithChildren<TextTitleBaseProps>

export function TextTitle({ children, margin, ...props }: TextTitleProps) {
  return (
    <TextTitleBase as="h1" margin={margin} {...props}>
      {children}
    </TextTitleBase>
  )
}

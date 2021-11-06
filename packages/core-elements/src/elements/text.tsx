import React from 'react'
import styled from 'styled-components'
import { Property } from 'csstype'
import { getColor, Color } from '@titicaca/color-palette'

import { MarginPadding, GlobalSizes, GetGlobalColor } from '../commons'
import {
  KeyOfTextStyleMap,
  ellipsisMixin,
  marginMixin,
  maxLinesMixin,
  paddingMixin,
  textStyleMixin,
} from '../mixins'
import { CSSProps } from '../css'

function rgba({ color, alpha }: { color?: string; alpha?: number }) {
  return `rgba(${GetGlobalColor(color || 'gray')}, ${alpha || 1})`
}

export type TextProps = React.PropsWithChildren<{
  alpha?: number
  bold?: boolean
  center?: boolean
  color?: Color
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
}> &
  CSSProps

const Text = styled.div<TextProps>(
  (props) => ({
    boxSizing: 'border-box',
    overflowWrap: 'break-word',
    color: props.alpha
      ? rgba({ color: props.color, alpha: props.alpha })
      : `rgba(${getColor(props.color ?? 'gray')})`,
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

const TextHtml = styled(Text)`
  line-height: 1.63;

  p {
    margin: 1.5rem 0 0 0;
  }

  p:first-of-type {
    margin-top: 0;
  }

  strong {
    color: ${({ color = 'gray' }) => rgba({ color, alpha: 1 })};
  }

  /* HACK: global-style의 underline 설정보다 우선하도록 수정 */
  && {
    a {
      font-size: 15px;
      font-weight: bold;
      color: #2987f0;
      text-decoration: underline;
    }
  }
`

interface TextTitleBaseProps extends CSSProps {
  margin?: MarginPadding
}

const TextTitleBase = styled(Text)<TextTitleBaseProps>`
  margin: 0;
  line-height: 1.2;
  font-size: 24px;
  font-weight: bold;
  color: #3a3a3a;
  ${marginMixin}
  ${(props) => props.css}
`

export type TextTitleProps = React.PropsWithChildren<TextTitleBaseProps>

function TextTitle({ css, children, margin }: TextTitleProps) {
  return (
    <TextTitleBase as="h1" css={css} margin={margin}>
      {children}
    </TextTitleBase>
  )
}
;(Text as CompoundedText).Html = TextHtml
;(Text as CompoundedText).Title = TextTitle
;(Text as CompoundedText).WithRef = Text

type CompoundedText = typeof Text & {
  Html: typeof TextHtml
  Title: typeof TextTitle
  /**
   * @deprecated
   */
  WithRef: typeof Text
}
;(Text as CompoundedText).Html = TextHtml
;(Text as CompoundedText).Title = TextTitle
;(Text as CompoundedText).WithRef = Text

export default Text as CompoundedText

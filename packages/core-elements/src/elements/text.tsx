import styled from 'styled-components'
import { Property } from 'csstype'
import { getColor, Color } from '@titicaca/color-palette'

import { GlobalSizes, GetGlobalColor } from '../commons'
import {
  KeyOfTextStyleMap,
  ellipsisMixin,
  maxLinesMixin,
  textStyleMixin,
} from '../mixins'
import { primitiveProps, PrimitiveProps } from '../primitive'

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
  maxLines?: number
  size?: GlobalSizes | number
  strikethrough?: boolean
  textAlign?: Property.TextAlign
  textStyle?: KeyOfTextStyleMap
  underline?: boolean
  wordBreak?: Property.WordBreak
}> &
  PrimitiveProps

const Text = styled.div<TextProps>(
  (props) => ({
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
  textStyleMixin,
  ellipsisMixin,
  maxLinesMixin,
  ...primitiveProps,
)

function TextTitle({ children, ...props }: TextProps) {
  return (
    <Text as="h1" lineHeight={1.2} size={24} bold color="gray" {...props}>
      {children}
    </Text>
  )
}

type CompoundedText = typeof Text & {
  Title: typeof TextTitle
}
;(Text as CompoundedText).Title = TextTitle

export default Text as CompoundedText

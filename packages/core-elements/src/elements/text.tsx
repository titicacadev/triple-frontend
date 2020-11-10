import * as React from 'react'
import styled, { css, StyledComponentProps } from 'styled-components'
import * as CSS from 'csstype'
import { getColor, Color } from '@titicaca/color-palette'

import { MarginPadding, GlobalSizes } from '../commons'
import {
  marginMixin,
  paddingMixin,
  getTextStyle,
  _unsafeTextStyle,
  KeyOfTextStyleMap,
} from '../mixins'

interface TextBaseProps
  extends Pick<CSS.Properties, 'wordBreak' | 'whiteSpace' | 'textAlign'> {
  size?: GlobalSizes | number
  textStyle?: KeyOfTextStyleMap
  bold?: boolean
  color?: Color
  floated?: CSS.Property.Float
  letterSpacing?: number
  lineHeight?: number | string
  center?: boolean
  underline?: boolean
  inline?: boolean
  inlineBlock?: boolean
  margin?: MarginPadding
  padding?: MarginPadding
  ellipsis?: boolean
  maxLines?: number
  strikethrough?: boolean
}

interface TitleBaseProps {
  margin?: MarginPadding
}

export type TextProps = React.PropsWithChildren<
  StyledComponentProps<'div', any, TextBaseProps, never>
>

function Line({ children }: React.PropsWithChildren<{}>) {
  return (
    <>
      {children}
      <br />
    </>
  )
}

export function LineBreak({ children }: { children?: string }) {
  const texts = (children || '').split('\n')

  return (
    <>
      {texts.map((text: string, i: number) =>
        i === texts.length - 1 ? text : <Line key={i}>{text}</Line>,
      )}
    </>
  )
}

const TextBase = styled.div<TextBaseProps>`
  ${({ textStyle, size, lineHeight, letterSpacing }) => {
    if (textStyle && (size || lineHeight || letterSpacing)) {
      console.warn(
        "🙅🏻‍♂️\n[Warn] Please don't use `size`, `lineHeight` and `letterSpacing` with `textStyle` together. \nIf they are used together, `size` and `lineHeight` will be omit. See \nhttps://github.com/titicacadev/triple-frontend/issues/401",
      )
    }

    return textStyle
      ? getTextStyle(textStyle)
      : _unsafeTextStyle(size, lineHeight, letterSpacing)
  }}

  font-weight: ${({ bold }) => (bold ? 'bold' : 500)};
  color: ${({ color = 'gray' }) => `rgba(${getColor(color)})`};
  word-wrap: break-word;

  float: ${({ floated }) => floated || 'none'};

  ${({ wordBreak }) =>
    wordBreak &&
    css`
      word-break: ${wordBreak};
    `};

  ${({ whiteSpace }) =>
    whiteSpace &&
    css`
      white-space: ${whiteSpace};
    `};

  ${({ underline }) =>
    underline &&
    css`
      text-decoration: underline;
    `};

  ${({ center, textAlign }) =>
    css`
      text-align: ${textAlign ?? (center ? 'center' : 'inherit')};
    `}

  ${({ inline }) =>
    inline &&
    css`
      display: inline;
    `};

  ${({ inlineBlock }) =>
    inlineBlock &&
    css`
      display: inline-block;
    `};

  ${marginMixin}

  ${paddingMixin}

  ${({ ellipsis }) =>
    ellipsis &&
    css`
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `};

  ${({ maxLines }) =>
    maxLines &&
    css`
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: ${maxLines};
      text-overflow: ellipsis;
      overflow: hidden;
    `};

  ${({ strikethrough }) =>
    strikethrough &&
    css<{ color?: Color; alpha?: number }>`
      position: relative;
      &:after {
        position: absolute;
        left: 0;
        top: 45%;
        height: 1px;
        background: ${({ color = 'gray' }) => `rgba(${getColor(color)})`};
        content: '';
        width: 100%;
        display: block;
      }
    `};
`

function Text({ children, ...props }: TextProps) {
  return <TextBase {...props}>{ChildrenWithLineBreaks(children)}</TextBase>
}

const Html = styled(TextBase)`
  line-height: 1.63;

  p {
    margin: 1.5rem 0 0 0;
  }

  p:first-of-type {
    margin-top: 0;
  }

  strong {
    color: ${({ color = 'gray' }) => `rgba(${getColor(color)})`};
  }

  a {
    font-size: 15px;
    font-weight: bold;
    color: #2987f0;
    text-decoration: underline;
  }
`

const TitleBase = styled.h1<TitleBaseProps>`
  margin: 0;
  line-height: 1.2;
  font-size: 24px;
  font-weight: bold;
  color: #3a3a3a;

  ${marginMixin}
`

function TextTitle({
  children,
  ...props
}: React.PropsWithChildren<
  StyledComponentProps<'h1', any, TitleBaseProps, never>
>) {
  return (
    <TitleBase {...props}>
      {React.Children.toArray(children).map((child, i) =>
        typeof child === 'string' ? (
          <LineBreak key={i}>{child}</LineBreak>
        ) : (
          child
        ),
      )}
    </TitleBase>
  )
}

const TextWithRef = React.forwardRef<HTMLDivElement, TextProps>(
  ({ children, ...props }, ref) => (
    <TextBase ref={ref} {...props}>
      {ChildrenWithLineBreaks(children)}
    </TextBase>
  ),
)

function ChildrenWithLineBreaks(children: React.ReactNode) {
  return React.Children.toArray(children).map((child, i) =>
    typeof child === 'string' ? <LineBreak key={i}>{child}</LineBreak> : child,
  )
}

TextWithRef.displayName = 'TextWithRef'

Text.Html = Html
Text.Title = TextTitle
Text.WithRef = TextWithRef

export default Text

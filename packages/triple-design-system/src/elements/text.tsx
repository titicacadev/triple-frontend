import * as React from 'react'
import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import {
  MarginPadding,
  GlobalSizes,
  SetGlobalColor,
  GlobalColors,
} from '../commons'

const SIZES: { [key in GlobalSizes]: string } = {
  mini: '12px',
  tiny: '13px',
  small: '14px',
  medium: '15px',
  large: '16px',
  big: '19px',
  huge: '21px',
  massive: '24px',
}

export function LineBreak({ children }: { children?: string }) {
  const Line = ({ children }) => (
    <>
      {children}
      <br />
    </>
  )

  const texts = (children || '').split('\n')

  return (
    <>
      {texts.map(
        (text: string, i: number) =>
          i === texts.length - 1 ? text : <Line key={i}>{text}</Line>,
      )}
    </>
  )
}

function rgba({ color, alpha }: { color?: string; alpha?: number }) {
  return `rgba(${SetGlobalColor(color || 'gray')}, ${alpha || 1})`
}

const TextBase = styled.div<{
  size?: GlobalSizes | number
  bold?: boolean
  alpha?: number
  color?: string
  floated?: CSS.FloatProperty
  lineHeight?: number
  wordBreak?: CSS.WordBreakProperty
  whiteSpace?: CSS.WhiteSpaceProperty
  center?: boolean
  underline?: boolean
  inline?: boolean
  inlineBlock?: boolean
  margin?: MarginPadding
  padding?: MarginPadding
  ellipsis?: boolean
  maxLines?: number
  strikethrough?: boolean
}>`
  font-size: ${({ size = 'large' }) =>
    typeof size === 'string' ? SIZES[size] : `${size}px`};
  font-weight: ${({ bold }) => (bold ? 'bold' : 500)};
  color: ${({ color = 'gray', alpha }) => rgba({ color, alpha })};
  word-wrap: break-word;

  float: ${({ floated }) => floated || 'none'};

  line-height: ${({ lineHeight }) => lineHeight || 1.2};

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

  ${({ center }) =>
    center &&
    css`
      text-align: center;
    `};

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

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};

  ${({ padding }) =>
    padding &&
    css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `};

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
    css`
      position: relative;
      &:after {
        position: absolute;
        left: 0;
        top: 45%;
        height: 1px;
        background: ${({ color = 'gray' as GlobalColors, alpha }) =>
          rgba({ color, alpha })};
        content: '';
        width: 100%;
        display: block;
      }
    `};
`

function Text({ children, ...props }) {
  return (
    <TextBase {...props}>
      {React.Children.toArray(children).map(
        (child, i) =>
          typeof child === 'string' ? (
            <LineBreak key={i}>{child}</LineBreak>
          ) : (
            child
          ),
      )}
    </TextBase>
  )
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
    color: ${({ color = 'gray' }) => rgba({ color, alpha: 1 })};
  }

  a {
    font-size: 15px;
    font-weight: bold;
    color: #2987f0;
    text-decoration: underline;
  }
`

const TitleBase = styled.h1<{
  margin?: MarginPadding
}>`
  margin: 0;
  line-height: 1.2;
  font-size: 24px;
  font-weight: bold;
  color: #3a3a3a;

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};
`

function Title({ children, ...props }) {
  return (
    <TitleBase {...props}>
      {React.Children.toArray(children).map(
        (child, i) =>
          typeof child === 'string' ? (
            <LineBreak key={i}>{child}</LineBreak>
          ) : (
            child
          ),
      )}
    </TitleBase>
  )
}

Text.Html = Html
Text.Title = Title

export default Text

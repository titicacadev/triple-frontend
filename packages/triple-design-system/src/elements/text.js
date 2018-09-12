import React from 'react'
import styled, { css } from 'styled-components'

const SIZES = {
  mini: '12px',
  tiny: '13px',
  small: '14px',
  medium: '15px',
  large: '16px',
  big: '19px',
  huge: '21px',
}

const COLORS = {
  blue: '41, 135, 240',
  gray: '58, 58, 58',
}

export function LineBreak({ children }) {
  const Line = ({ children }) => (
    <>
      {children}
      <br />
    </>
  )

  return (
    <>
      {(children || '').split('\n').map((text, i) => (
        <Line key={i}>{text}</Line>
      ))}
    </>
  )
}

function rgba({ color = 'gray', alpha = 1 }) {
  return `rgba(${COLORS[color]}, ${alpha})`
}

const TextBase = styled.div`
  font-family: sans-serif;
  font-size: ${({ size = 'large' }) => SIZES[size]};
  font-weight: ${({ bold }) => (bold ? 'bold' : 500)};
  color: ${({ color = 'gray', alpha = 0.7 }) => rgba({ color, alpha })};

  ${({ lineHeight }) =>
    lineHeight &&
    css`
      line-height: ${lineHeight};
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};

  ${({ ellipsis }) =>
    ellipsis &&
    css`
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    `};
`

function Text({ children, ...props }) {
  return (
    <TextBase {...props}>
      <LineBreak>{children}</LineBreak>
    </TextBase>
  )
}

const Html = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  color: rgba(58, 58, 58, 0.7);

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};

  p {
    margin: 1.5rem 0 0 0;
  }

  p:first-of-type {
    margin-top: 0;
  }

  a {
    font-size: 15px;
    font-weight: bold;
    color: #2987f0;
    text-decoration: underline;
  }
`

Text.Html = Html

export default Text

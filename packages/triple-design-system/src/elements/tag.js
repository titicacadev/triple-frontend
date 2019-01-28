import React from 'react'
import styled, { css } from 'styled-components'

const COLORS = {
  special: '#fd2e69',
  pink: '#fff',
  purple: '#fff',
  default: 'rgba(58, 58, 58, 0.8)',
}

const BG_COLORS = {
  special: 'rgba(253, 46, 105, 0.1)',
  pink: '#fd2e69',
  purple: '#9b71f7',
  default: '#f5f5f5',
}

const PADDING_SIZE = {
  tiny: { top: 2, right: 8, bottom: 2, left: 8 },
  mini: { top: 4, right: 6, bottom: 4, left: 6 },
  small: { top: 4, right: 10, bottom: 4, left: 10 },
  medium: { top: 6, right: 10, bottom: 6, left: 10 },
}

const TagBase = styled.div`
  display: inline-block;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${({ type }) => COLORS[type || 'default']};
  background-color: ${({ type }) => BG_COLORS[type || 'default']};
  border-radius: 4px;

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};

  ${({ size = 'mini' }) => {
    const padding = PADDING_SIZE[size]
    return css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `
  }};

  ${({ style }) =>
    style &&
    css`
      ${Object.keys(style)
        .map((key) => `${key}: ${style[key]};`)
        .join('\n')};
    `};
`

const Tag = function({ children, ...props }) {
  return <TagBase {...props}>{children}</TagBase>
}

export default Tag

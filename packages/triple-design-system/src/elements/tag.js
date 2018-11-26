import React from 'react'
import styled, { css } from 'styled-components'

const COLORS = {
  special: '#fd2e69',
  default: 'rgba(58, 58, 58, 0.8)',
}

const BG_COLORS = {
  special: 'rgba(253, 46, 105, 0.1)',
  default: '#f5f5f5',
}

const TagBase = styled.div`
  display: inline-block;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${({ type }) => COLORS[type || 'default']};
  background-color: ${({ type }) => BG_COLORS[type || 'default']};
  padding: 4px 6px;
  border-radius: 4px;

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};

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

import React from 'react'
import styled, { css } from 'styled-components'

const TagBase = styled.div`
  display: inline;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: ${({ color }) => color || 'rgba(58, 58, 58, 0.8)'};
  background-color: ${({ backgroundColor }) => backgroundColor || '#f5f5f5'};
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
`

const Tag = function({ children, ...style }) {
  return <TagBase {...style}>{children}</TagBase>
}

export default Tag

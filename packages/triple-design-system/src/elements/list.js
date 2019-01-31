import React, { Children } from 'react'
import styled, { css } from 'styled-components'
import { HR1, HR3 } from './hr'

const ListBase = styled.ul`
  margin: 0;
  padding: 0;

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};

  li:not(:first-child) {
    ${({ verticalGap }) => css`
      margin-top: ${verticalGap || 0}px;
    `};
  }

  ${({ clearing }) =>
    clearing &&
    css`
      li {
        &:after {
          content: '';
          display: block;
          clear: both;
        }
      }
    `};
`

function List({ divided, verticalGap, children, ...props }) {
  if (divided) {
    return (
      <ListBase {...props}>
        {Children.toArray(children)
          .reduce(
            (array, child) => [
              ...array,
              child,
              <HR1
                key={array.length + 1}
                margin={{ top: verticalGap / 2, bottom: verticalGap / 2 }}
              />,
            ],
            [],
          )
          .slice(0, -1)}
      </ListBase>
    )
  } else if (verticalGap) {
    return (
      <ListBase {...props}>
        {Children.toArray(children)
          .reduce(
            (array, child) => [
              ...array,
              child,
              <HR3 key={array.length + 1} height={verticalGap} />,
            ],
            [],
          )
          .slice(0, -1)}
      </ListBase>
    )
  }

  return <ListBase {...props}>{children}</ListBase>
}

const ListItem = styled.li`
  clear: both;
  position: relative;
  list-style-type: none;

  ${({ minHeight }) =>
    minHeight &&
    css`
      min-height: ${minHeight}px;
    `};
`

List.Item = ListItem

export default List

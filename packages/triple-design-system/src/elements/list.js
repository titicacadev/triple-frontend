import React, { Children } from 'react'
import styled, { css } from 'styled-components'
import Icon from './icon'
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

const ListIcon = styled(Icon)`
  display: table-cell;
  padding-right: 10px;
`

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

const ListContent = styled.div`
  display: table-cell;
  ${(maxWidth) => (maxWidth.maxWidth ? 'max-width: ' + maxWidth.maxWidth : '')};
`

const ListActions = styled.div`
  float: right;
`

const ListActionCell = styled.div`
  height: 40px;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
`

const ListActionLabel = styled.div`
  display: inline-block;
  padding-top: 8px;
  padding-bottom: 7px;
  padding-left: 17px;
  padding-right: 17px;
  text-align: center;
  font-family: sans-serif;
  font-size: 12px;
  font-weight: bold;
  color: #3a3a3a;
  border-radius: 17px;
  background-color: #fafafa;
`

function ListAction({ children }) {
  return (
    <ListActions>
      <ListActionCell>
        <ListActionLabel>{children}</ListActionLabel>
      </ListActionCell>
    </ListActions>
  )
}

List.Item = ListItem
List.Icon = ListIcon
List.Content = ListContent
List.Action = ListAction

export default List

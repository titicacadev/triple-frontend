import * as React from 'react'
import styled, { css } from 'styled-components'
import { HR1, HR3 } from './hr'
import { MarginPadding } from '../commons'

interface ListBaseProp {
  margin?: MarginPadding
  verticalGap?: number
  clearing?: boolean
}

const ListBase = styled.ul<ListBaseProp>`
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

const ListItem = styled.li<{ minHeight?: number }>`
  clear: both;
  position: relative;
  list-style-type: none;

  ${({ minHeight }) =>
    minHeight &&
    css`
      min-height: ${minHeight}px;
    `};
`

export default class List extends React.PureComponent<
  {
    divided?: boolean
    verticalGap?: number
    children?: any
  } & ListBaseProp
> {
  static Item = ListItem

  render() {
    const {
      props: { divided, verticalGap, children, ...props },
    } = this

    if (divided) {
      return (
        <ListBase {...props}>
          {React.Children.toArray(children)
            .reduce((array, child) => {
              const {
                props: { skipDivided },
              } = child

              return [
                ...array,
                child,
                !skipDivided && (
                  <HR1
                    key={array.length + 1}
                    margin={{ top: verticalGap / 2, bottom: verticalGap / 2 }}
                  />
                ),
              ]
            }, [])
            .slice(0, -1)}
        </ListBase>
      )
    } else if (verticalGap) {
      return (
        <ListBase {...props}>
          {React.Children.toArray(children)
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
}

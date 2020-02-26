import * as React from 'react'
import styled, { css } from 'styled-components'
import { MarginPadding } from '../commons'
import { marginMixin } from '../mixins'

interface ListBaseProp {
  margin?: MarginPadding
  verticalGap?: number
  clearing?: boolean
}

interface DividerOptions {
  divided?: boolean
  dividerColor?: string
  dividerWeight?: number
}

interface ListItemProps {
  margin?: MarginPadding
  noDivider?: boolean
  minHeight?: number
}

const ListBase = styled.ul<ListBaseProp & DividerOptions>`
  margin: 0;
  padding: 0;

  ${marginMixin}

  li:not(:first-child) {
    ${({ verticalGap = 0 }) => css`
      margin-top: ${verticalGap}px;
    `};
  }

  ${({
    verticalGap = 0,
    divided = false,
    dividerColor = 'transparent',
    dividerWeight = 1,
    clearing = false,
  }) =>
    (divided || clearing) &&
    css`
      ${clearing &&
        css`
          li:after {
            content: '';
            display: block;
            clear: both;
          }
        `}
      ${divided
        ? css`
            li:not(:last-child):after {
              content: '';
              display: block;
              height: 0;
              overflow: hidden;
              border-bottom: solid ${dividerWeight}px ${dividerColor};
              margin: ${verticalGap}px 0 ${verticalGap}px 0;
            }
          `
        : !clearing &&
          css`
            li:not(:last-child):after {
              display: none;
            }
          `}
    `}
`

const ListItem = styled.li<ListItemProps>`
  clear: both;
  position: relative;
  list-style-type: none;

  ${marginMixin}

  ${({ minHeight }) =>
    minHeight &&
    css`
      min-height: ${minHeight}px;
    `};

  ${({ noDivider = false }) =>
    noDivider &&
    css`
      &:not(:last-child):after {
        border-bottom: 0 none !important;
      }
    `}

  ${({ margin: { top: marginTop = 0, bottom: marginBottom = 0 } = {} }) =>
    css`
      &:not(:last-child):after {
        ${marginTop
          ? `
            margin-top: ${marginTop}px !important;
          `
          : ''}
        ${marginBottom
          ? `
            margin-bottom: ${marginBottom}px !important;
          `
          : ''}
      }
    `}
`

export default class List extends React.PureComponent<
  React.PropsWithChildren<ListItemProps & ListBaseProp & DividerOptions>
> {
  static Item = ListItem

  render() {
    const {
      props: { children, ...props },
    } = this

    return <ListBase {...props}>{children}</ListBase>
  }
}

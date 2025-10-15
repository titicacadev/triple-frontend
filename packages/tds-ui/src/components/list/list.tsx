import { PureComponent, PropsWithChildren } from 'react'
import { styled, css } from 'styled-components'

import { MarginPadding } from '../../commons'
import { marginMixin } from '../../mixins'
import { shouldForwardProp } from '../../utils/should-forward-prop'

interface ListBaseProp {
  margin?: MarginPadding
  verticalGap?: number
  clearing?: boolean
  marker?: boolean
}

interface DividerOptions {
  divided?: boolean
  dividerColor?: string
  dividerWeight?: number
}

export interface ListItemProps {
  margin?: MarginPadding
  noDivider?: boolean
  minHeight?: number
}

const ListBase = styled.ul.withConfig({ shouldForwardProp })<
  ListBaseProp & DividerOptions
>`
  ${marginMixin}

  & > li:not(:first-child) {
    ${({ divided, verticalGap = 0 }) => css`
      margin-top: ${divided ? verticalGap / 2 : verticalGap}px;
    `};
  }

  ${({ marker }) =>
    marker &&
    css`
      & {
        padding-left: 0.6em;
      }

      & > li {
        &::before {
          content: '·';
          position: absolute;
          top: 0;
          left: -0.6em;
        }
      }
    `}

  ${({ clearing }) =>
    clearing
      ? css`
          & > li {
            &::after {
              content: '';
              display: block;
              clear: both;
            }
          }
        `
      : ''}

  ${({
    divided,
    dividerWeight = 1,
    dividerColor = '#efefef',
    verticalGap = 0,
  }) =>
    divided
      ? css`
          & > li:not(:last-child) {
            &::after {
              content: '';
              display: block;
              height: 0;
              overflow: hidden;
              border-bottom: solid ${dividerWeight}px ${dividerColor};
              margin: ${verticalGap / 2}px 0 ${verticalGap / 2}px 0;
            }
          }
        `
      : ''}
`

const ListItem = styled.li.withConfig({
  shouldForwardProp,
})<ListItemProps>`
  clear: both;
  position: relative;
  list-style-type: none;

  ${marginMixin}

  ${({ minHeight }) =>
    minHeight &&
    css`
      min-height: ${minHeight}px;
    `};

  ${({
    noDivider = false,
    margin: { top: marginTop = 0, bottom: marginBottom = 0 } = {},
  }) =>
    noDivider &&
    css`
      &:not(:last-child) {
        &::after {
          border-bottom: 0 none !important;
          ${marginTop ? `margin-top: ${marginTop}px !important;` : ''}
          ${marginBottom ? `margin-bottom: ${marginBottom}px !important;` : ''}
        }
      }
    `}
`

export class List extends PureComponent<
  PropsWithChildren<ListItemProps & ListBaseProp & DividerOptions>
> {
  public static Item = ListItem

  public render() {
    const {
      props: { children, ...props },
    } = this

    return <ListBase {...props}>{children}</ListBase>
  }
}

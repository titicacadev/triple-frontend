import React from 'react'
import styled, { css } from 'styled-components'

import Container from '../container'
import ButtonBase from './button-base'

const ButtonGroup = styled(Container)<{
  horizontalGap?: number
  buttonCount?: number
}>`
  width: 100%;

  ${ButtonBase} {
    ${({ horizontalGap = 0, buttonCount, children }) => {
      const childrenCount = buttonCount ?? React.Children.count(children)

      return horizontalGap > 0
        ? css`
            width: ${childrenCount > 0
              ? `calc((100% - ${(childrenCount - 1) *
                  horizontalGap}px) / ${childrenCount})`
              : '100%'};
          `
        : css`
            width: ${100 / childrenCount}%;
          `
    }};

    &:not(:first-child) {
      ${({ horizontalGap }) => css`
        margin-left: ${horizontalGap || 0}px;
      `}
    }
  }
`

export default ButtonGroup

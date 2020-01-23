import styled, { css } from 'styled-components'
import * as CSS from 'csstype'

import Container from '../container'
import ButtonBase from './button-base'

const ButtonContainer = styled(Container)<{ floated?: CSS.FloatProperty }>`
  text-align: center;

  ${ButtonBase} {
    float: ${({ floated }) => floated || 'none'};
    display: inline-block;
    margin: 0 5px;

    &:first-child {
      ${({ floated }) => {
        if (floated === 'left') {
          return css`
            margin-left: 0;
            margin-right: 5px;
          `
        } else if (floated === 'right') {
          return css`
            margin-left: 5px;
            margin-right: 0;
          `
        }
      }};
    }
  }

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

export default ButtonContainer

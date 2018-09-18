import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import Container from './container'

const SIZES = {
  tiny: '13px',
}

const BORDER_RADIUSES = {
  tiny: '21px',
}

const ROUND_PADDINGS = {
  tiny: { top: 13, bottom: 13, left: 25, right: 25 },
}

const COMPACT_PADDINGS = {
  tiny: { top: 9, bottom: 9, left: 15, right: 15 },
}

const ICON_PADDINGS = {
  tiny: { top: 12, bottom: 12, left: 12, right: 12 },
}

const TEXT_COLORS = {
  blue: '41, 135, 240',
  gray: '58, 58, 58',
}

const BUTTON_COLORS = {
  blue: '54, 143, 255',
}

const ICON_BUTTON_NAMES = {
  save: 'btn-end-save-off@2x.png',
  star: 'btn-end-review@2x.png',
  map: 'btn-end-search-place@2x.png',
  share: 'btn-com-share@2x.png',
  schedule: 'btn-end-schedule@2x.png',
}

const ButtonBase = styled.a`
  display: inline-block;
  font-family: sans-serif;
  font-size: ${({ size = 'tiny' }) => SIZES[size]};
  font-weight: ${({ bold }) => (bold ? 'bold' : 500)};
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;

  color: ${({ color = 'gray', alpha = 0.7 }) =>
    `rgba(${TEXT_COLORS[color]}, ${alpha})`};
`

const IconButton = styled(ButtonBase)`
  &:before {
    display: block;
    height: 30px;
    background-image: url(${({ name }) =>
      `https://assets.triple.guide/images/${
        ICON_BUTTON_NAMES[name]
      }`});
    background-size: 30px 30px;
    background-position: center center;
    background-repeat: no-repeat;
    content: '';
  }

  ${({ size = 'tiny' }) => {
    const padding = ICON_PADDINGS[size]

    return css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `
  }};
`

const RoundButton = styled(ButtonBase)`
  line-height: ${({ size = 'tiny' }) => SIZES[size]};
  border-radius: ${({ size = 'tiny' }) => BORDER_RADIUSES[size]};
  color: #ffffff;

  ${({ compact, size = 'tiny' }) => {
    const padding = (compact ? COMPACT_PADDINGS : ROUND_PADDINGS)[size]

    return css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `
  }};

  background-color: ${({ color = 'blue', alpha = 1 }) =>
    `rgba(${BUTTON_COLORS[color]}, ${alpha})`};
`

class Button extends PureComponent {
  render() {
    const {
      props: { bold, compact, icon, color, alpha, children, ...props },
    } = this

    if (icon) {
      return (
        <IconButton
          bold={bold}
          name={icon}
          color={color || 'gray'}
          alpha={alpha || '0.5'}
          {...props}
        >
          {children}
        </IconButton>
      )
    }

    return (
      <RoundButton
        bold={bold || true}
        compact={compact}
        color={color || 'blue'}
        alpha={alpha || 1}
        {...props}
      >
        {children}
      </RoundButton>
    )
  }
}

const ButtonContainer = styled(Container)`
  text-align: center;

  a {
    float: ${({ floated }) => floated || 'none'};
    display: inline-block;
    margin: 0 5px;
  }

  a:first-child {
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

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

const ButtonGroup = styled(Container)`
  width: 100%;

  a {
    width: ${({ children }) => 100 / children.length}%;
  }
`

Button.Container = ButtonContainer
Button.Group = ButtonGroup

export default Button

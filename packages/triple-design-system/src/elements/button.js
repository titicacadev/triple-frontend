import React, { PureComponent } from 'react'
import styled, { css } from 'styled-components'
import Container from './container'

const SIZES = {
  tiny: '13px',
  small: '14px',
}

const BUTTON_COLORS = {
  blue: '54, 143, 255',
  gray: '58, 58, 58',
}

const ButtonBase = styled.a`
  display: inline-block;
  font-family: sans-serif;
  font-size: ${({ size }) => SIZES[size]};
  font-weight: ${({ bold }) => (bold ? 'bold' : 500)};
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;

  color: ${({ textColor = 'gray', textAlpha = 1 }) =>
    `rgba(${TEXT_COLORS[textColor]}, ${textAlpha})`};

  float: ${({ floated }) => floated || 'none'};

  ${({ fluid }) =>
    fluid &&
    css`
      width: 100%;
      display: block;
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.3;
    `};
`

const ICON_BUTTON_URLS = {
  saveEmpty: 'https://assets.triple.guide/images/btn-end-save-off@4x.png',
  saveFilled: 'https://assets.triple.guide/images/btn-end-save-on@4x.png',
  starEmpty: 'https://assets.triple.guide/images/btn-end-review@4x.png',
  starFilled: 'https://assets.triple.guide/images/btn-end-review-on@4x.png',
  map: 'https://assets.triple.guide/images/btn-end-search-place@2x.png',
  share: 'https://assets.triple.guide/images/btn-com-share@2x.png',
  schedule: 'https://assets.triple.guide/images/btn-end-schedule@4x.png',
}

const TEXT_COLORS = {
  blue: '41, 135, 240',
  gray: '58, 58, 58',
  white: '255, 255, 255',
}

const ICON_PADDINGS = {
  tiny: { top: 12, bottom: 12, left: 12, right: 12 },
}

const IconButton = styled(ButtonBase)`
  &:before {
    display: block;
    height: 30px;
    background-image: url(${({ name }) => ICON_BUTTON_URLS[name]});
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

const BASIC_PADDINGS = {
  tiny: { top: 7, bottom: 7, left: 12, right: 12 },
  small: { top: 7, bottom: 7, left: 15, right: 15 },
  large: { top: 14, bottom: 14, left: 15, right: 15 },
}

const BasicButton = styled(ButtonBase)`
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${({ color = 'gray', alpha = 0.2 }) =>
    `rgba(${BUTTON_COLORS[color]}, ${alpha})`};
  background-color: transparent;

  ${({ size }) => {
    const padding = BASIC_PADDINGS[size]

    return css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `
  }};
`

const BORDER_RADIUSES = {
  tiny: '21px',
}

const ROUND_PADDINGS = {
  tiny: { top: 13, bottom: 13, left: 25, right: 25 },
}

const COMPACT_ROUND_PADDINGS = {
  tiny: { top: 9, bottom: 9, left: 15, right: 15 },
}

const RoundButton = styled(ButtonBase)`
  border-radius: ${({ size = 'tiny' }) => BORDER_RADIUSES[size]};
  color: #ffffff;

  background-color: ${({ color = 'blue', alpha = 1 }) =>
    `rgba(${BUTTON_COLORS[color]}, ${alpha})`};

  ${({ compact, size = 'tiny' }) => {
    const padding = (compact ? COMPACT_ROUND_PADDINGS : ROUND_PADDINGS)[size]

    return css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `
  }};
`

const COLORFUL_BACKGROUND = { white: '#ffffff', blue: '#368fff' }

const COLORFUL_PADDINGS = {
  tiny: { top: 7, bottom: 7, left: 12, right: 12 },
  small: { top: 7, bottom: 7, left: 15, right: 15 },
  large: { top: 14, bottom: 14, left: 15, right: 15 },
}

const Colorful_Button = styled(ButtonBase)`
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
  border-color: ${({ color = 'gray', alpha = 0.2 }) =>
    `rgba(${BUTTON_COLORS[color]}, ${alpha})`};

  ${({ size }) => {
    const padding = COLORFUL_PADDINGS[size]

    return css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `
  }};

  ${({ bgColor }) =>
    bgColor &&
    css`
      background-color: ${COLORFUL_BACKGROUND[bgColor]};
    `};
`

class Button extends PureComponent {
  render() {
    const {
      props: {
        basic,
        icon,
        colorful,
        bgColor,
        size,
        textColor,
        textAlpha,
        children,
        ...props
      },
    } = this

    if (basic) {
      return (
        <BasicButton
          bold
          size={size || 'small'}
          textColor={textColor || 'gray'}
          textAlpha={textAlpha}
          {...props}
        >
          {children}
        </BasicButton>
      )
    }

    if (icon) {
      return (
        <IconButton
          name={icon}
          size={size || 'tiny'}
          textColor={textColor || 'gray'}
          textAlpha={textAlpha || 0.5}
          {...props}
        >
          {children}
        </IconButton>
      )
    }

    if (colorful) {
      return (
        <Colorful_Button
          size={size || 'small'}
          textColor={textColor || 'gray'}
          textAlpha={textAlpha}
          bgColor={bgColor}
          {...props}
        >
          {children}
        </Colorful_Button>
      )
    }

    return (
      <RoundButton
        bold
        size={size || 'tiny'}
        textColor={textColor || 'white'}
        textAlpha={textAlpha}
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
    ${({ horizontalGap, children }) =>
      horizontalGap
        ? css`
            width: calc(
              (100% - ${(children.length - 1) * horizontalGap}px) /
                ${children.length}
            );
          `
        : css`
            width: ${100 / children.length}%;
          `};

    padding-left: 0;
    padding-right: 0;
  }

  a:not(:first-child) {
    ${({ horizontalGap }) => css`
      margin-left: ${horizontalGap || 0}px;
    `};
  }
`

Button.Container = ButtonContainer
Button.Group = ButtonGroup

export default Button

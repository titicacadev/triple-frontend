import React, { Children, PureComponent } from 'react'
import styled, { css } from 'styled-components'
import Container from './container'

const SIZES = {
  tiny: '13px',
  small: '14px',
  large: '16px',
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

const BASIC_COLORS = {
  gray: {
    border: 'rgba(58, 58, 58, 0.2)',
    text: '#3a3a3a',
  },
}

const BASIC_INVERTED_COLORS = {
  blue: '#368fff',
}

const BasicButton = styled(ButtonBase)`
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;

  ${({ compact }) =>
    compact
      ? css`
          padding: 7px 12px 7px 12px;
        `
      : css`
          padding: 14px 12px 14px 12px;
        `};

  ${({ inverted, color }) => {
    if (inverted) {
      return css`
        background-color: ${BASIC_INVERTED_COLORS[color || 'blue']};
        border-color: ${BASIC_INVERTED_COLORS[color || 'blue']};
        color: white;
      `
    } else {
      return css`
        background-color: transparent;
        border-color: ${BASIC_COLORS[color || 'gray'].border};
        color: ${BASIC_COLORS[color || 'gray'].text};
      `
    }
  }};
`

const NORMAL_PADDINGS = {
  tiny: { top: 13, bottom: 13, left: 25, right: 25 },
  small: { top: 14, bottom: 14, left: 25, right: 25 },
}

const COMPACT_NORMAL_PADDINGS = {
  tiny: { top: 9, bottom: 9, left: 15, right: 15 },
}

const NormalButton = styled(ButtonBase)`
  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${borderRadius}px;
    `};
  color: #ffffff;

  background-color: ${({ color = 'blue', alpha = 1 }) =>
    `rgba(${BUTTON_COLORS[color]}, ${alpha})`};

  ${({ compact, size = 'tiny' }) => {
    const padding = (compact ? COMPACT_NORMAL_PADDINGS : NORMAL_PADDINGS)[size]

    return css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `
  }};
`

class Button extends PureComponent {
  render() {
    const {
      props: {
        basic,
        icon,
        size,
        textColor,
        textAlpha,
        children,
        borderRadius,
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

    return (
      <NormalButton
        bold
        size={size || 'tiny'}
        textColor={textColor || 'white'}
        textAlpha={textAlpha}
        borderRadius={borderRadius || 21}
        {...props}
      >
        {children}
      </NormalButton>
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
    ${({ horizontalGap, children }) => {
      const childrenCount = Children.count(children)

      return (horizontalGap || 0) > 0
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
  }

  a:not(:first-child) {
    ${({ horizontalGap }) => css`
      margin-left: ${horizontalGap || 0}px;
    `};
  }
`

const BUTTON_ICON_STYLES = {
  compact: {
    width: '15px',
    height: '12px',
    margin: '2px 5px 0 0',
  },
  small: {
    width: '16px',
    height: '16px',
    margin: '0 5px 0 0',
  },
}

const ButtonIcon = styled.div`
  display: inline-block;

  ${({ size = 'compact' }) =>
    BUTTON_ICON_STYLES[size] &&
    `
    width: ${BUTTON_ICON_STYLES[size].width};
    height: ${BUTTON_ICON_STYLES[size].height};
    background-size: ${BUTTON_ICON_STYLES[size].width} ${
      BUTTON_ICON_STYLES[size].height
    };
    margin: ${BUTTON_ICON_STYLES[size].margin};
    `};

  vertical-align: text-top;

  background-image: url(${({ src }) => src});
`

Button.Container = ButtonContainer
Button.Group = ButtonGroup
Button.Icon = ButtonIcon

export default Button

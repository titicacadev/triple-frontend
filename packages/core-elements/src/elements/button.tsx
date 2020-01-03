import * as React from 'react'
import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import Container from './container'
import {
  GlobalSizes,
  GlobalColors,
  MarginPadding,
  GetGlobalColor,
} from '../commons'

const SIZES: Partial<Record<GlobalSizes, ReturnType<typeof css>>> = {
  tiny: css`
    font-size: 13px;
    line-height: 16px;
  `,
  small: css`
    font-size: 14px;
    line-height: 17px;
  `,
  large: css`
    font-size: 16px;
  `,
}

interface ButtonBaseProp {
  size?: GlobalSizes
  bold?: boolean
  textColor?: string
  textAlpha?: number
  floated?: CSS.FloatProperty
  fluid?: boolean
  margin?: MarginPadding
  disabled?: boolean
}

const ButtonBase = styled.a<ButtonBaseProp>`
  display: inline-block;
  ${({ size }) => SIZES[size]}
  font-weight: ${({ bold }) => (bold ? 'bold' : 500)};
  text-align: center;
  text-decoration: none;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;

  &:active {
    border-style: solid;
  }

  color: ${({ textColor = 'gray', textAlpha = 1 }) =>
    `rgba(${GetGlobalColor(textColor)}, ${textAlpha})`};

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

const ICON_BUTTON_URLS: { [key: string]: string } = {
  saveEmpty: 'https://assets.triple.guide/images/btn-end-save-off@4x.png',
  saveFilled: 'https://assets.triple.guide/images/btn-end-save-on@4x.png',
  starEmpty: 'https://assets.triple.guide/images/btn-end-review@4x.png',
  starFilled: 'https://assets.triple.guide/images/btn-end-review-on@4x.png',
  map: 'https://assets.triple.guide/images/btn-end-search-place@2x.png',
  share: 'https://assets.triple.guide/images/btn-com-share@2x.png',
  schedule: 'https://assets.triple.guide/images/btn-end-schedule@4x.png',
}

const ICON_PADDINGS: Partial<Record<GlobalSizes, MarginPadding>> = {
  tiny: { top: 12, bottom: 12, left: 12, right: 12 },
}

const IconButton = styled(ButtonBase)<{ name?: string }>`
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

const BASIC_COLORS: Partial<
  Record<GlobalColors, { border: string; text: string }>
> = {
  gray: {
    border: 'rgba(58, 58, 58, 0.2)',
    text: '#3a3a3a',
  },
}

const BASIC_INVERTED_COLORS: Partial<Record<GlobalColors, string>> = {
  blue: '#368fff',
}

interface BasicButtonProp {
  compact?: boolean
  inverted?: boolean
  color?: GlobalColors
}

const BasicButton = styled(ButtonBase)<BasicButtonProp>`
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

const NORMAL_PADDINGS: Partial<Record<GlobalSizes, MarginPadding>> = {
  tiny: { top: 13, bottom: 13, left: 25, right: 25 },
  small: { top: 14, bottom: 14, left: 25, right: 25 },
  large: { top: 16, bottom: 16, left: 25, right: 25 },
}

const COMPACT_NORMAL_PADDINGS: Partial<Record<GlobalSizes, MarginPadding>> = {
  tiny: { top: 9, bottom: 9, left: 15, right: 15 },
}

// eslint-disable-next-line no-unexpected-multiline
const NormalButton = styled(ButtonBase)<{
  borderRadius?: number
  color?: string
  alpha?: number
  compact?: boolean
}>`
  ${({ borderRadius }) =>
    borderRadius &&
    css`
      border-radius: ${borderRadius}px;
    `};
  color: #ffffff;

  background-color: ${({ color = 'blue', alpha = 1 }) =>
    `rgba(${GetGlobalColor(color)}, ${alpha})`};

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

// eslint-disable-next-line no-unexpected-multiline
const ButtonGroup = styled(Container)<{
  horizontalGap?: number
  children?: React.ReactNode
}>`
  width: 100%;

  ${ButtonBase} {
    ${({ horizontalGap, children }) => {
      const childrenCount = React.Children.count(children)

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

    &:not(:first-child) {
      ${({ horizontalGap }) => css`
        margin-left: ${horizontalGap || 0}px;
      `}
    }
  }
`

const BUTTON_ICON_STYLES: Partial<
  Record<GlobalSizes, ReturnType<typeof css>>
> = {
  tiny: css`
    width: 15px;
    height: 12px;
    background-size: 15px 12px;
    margin: 2px 5px 0 0;
  `,
  small: css`
    width: 16px;
    height: 16px;
    background-size: 16px 16px;
    margin: 0 3px 0 -3px;
  `,
}

const ButtonIcon = styled.div<{ size?: GlobalSizes; src?: string }>`
  display: inline-block;

  ${({ size = 'tiny' }) => BUTTON_ICON_STYLES[size]};

  vertical-align: text-top;

  background-image: url(${({ src }) => src});
`

interface ButtonProps extends BasicButtonProp, ButtonBaseProp {
  basic?: boolean
  icon?: string
  borderRadius?: number
  onClick?: (e: React.SyntheticEvent) => any
  as?: keyof JSX.IntrinsicElements
}

class Button extends React.PureComponent<ButtonProps> {
  static Container = ButtonContainer

  static Group = ButtonGroup

  static Icon = ButtonIcon

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
        onClick,
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
          onClick={onClick}
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
          onClick={onClick}
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
        onClick={onClick}
        {...props}
      >
        {children}
      </NormalButton>
    )
  }
}

export default Button

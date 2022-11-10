import styled, { css } from 'styled-components'
import { getColor, Color } from '@titicaca/color-palette'
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  PureComponent,
  ReactNode,
  SyntheticEvent,
} from 'react'

import { GlobalSizes, MarginPadding } from '../../commons'
import { formatMarginPadding } from '../../mixins'

import ButtonBase, { ButtonBaseProp } from './button-base'
import ButtonContainer from './button-container'
import ButtonGroup from './button-group'

const ICON_BUTTON_URLS: { [key: string]: string } = {
  saveEmpty: 'https://assets.triple.guide/images/btn-end-save-off@4x.png',
  saveFilled: 'https://assets.triple.guide/images/btn-end-save-on@4x.png',
  starEmpty: 'https://assets.triple.guide/images/btn-end-review@4x.png',
  starFilled: 'https://assets.triple.guide/images/btn-end-review-on@4x.png',
  map: 'https://assets.triple.guide/images/btn-end-search-place@2x.png',
  share: 'https://assets.triple.guide/images/btn-com-share@3x.png',
  schedule: 'https://assets.triple.guide/images/btn-end-schedule@4x.png',
}

const ICON_PADDINGS: Partial<Record<GlobalSizes, MarginPadding>> = {
  tiny: { top: 12, bottom: 12, left: 12, right: 12 },
}

const IconButton = styled(ButtonBase)<{ name?: string }>`
  &::before {
    display: block;
    height: 30px;
    ${({ name }) =>
      name ? `background-image: url(${ICON_BUTTON_URLS[name]});` : ''}

    background-size: 30px 30px;
    background-position: center center;
    background-repeat: no-repeat;
    content: '';
  }

  ${({ size = 'tiny' }) => {
    const padding: MarginPadding | undefined = ICON_PADDINGS[size]

    return formatMarginPadding(padding, 'padding')
  }};
`

const BASIC_COLORS: Partial<Record<Color, { border: string; text: string }>> = {
  gray: {
    border: 'rgba(58, 58, 58, 0.2)',
    text: '#3a3a3a',
  },
}

const BASIC_INVERTED_COLORS: Partial<Record<Color, string>> = {
  blue: '#368fff',
  gray: '#3a3a3a',
}

interface BasicButtonProp {
  children?: ReactNode
  compact?: boolean
  inverted?: boolean
  color?: Color
}

const BasicButton = styled(ButtonBase)<BasicButtonProp>`
  border-style: solid;
  border-radius: 4px;
  border-width: 1px;

  ${({ compact }) =>
    compact
      ? css`
          padding: 7px 12px;
        `
      : css`
          padding: 14px 12px;
        `};

  ${({ inverted, color }) => {
    if (inverted) {
      return css`
        background-color: ${BASIC_INVERTED_COLORS[color || 'blue']};
        border-color: ${BASIC_INVERTED_COLORS[color || 'blue']};
        color: white;
      `
    } else {
      const { border = '', text = '' } = BASIC_COLORS[color || 'gray'] || {}
      return css`
        background-color: transparent;
        ${border && `border-color: ${border};`}
        ${text && `color: ${text};`}
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

const NormalButton = styled(ButtonBase)<{
  borderRadius: number
  color?: Color
  compact?: boolean
}>`
  ${({ borderRadius }) => css`
    border-radius: ${borderRadius}px;
  `};
  color: #fff;

  background-color: ${({ color = 'blue' }) => `rgba(${getColor(color)}) `};

  ${({ compact, size = 'tiny' }) => {
    const padding = (compact ? COMPACT_NORMAL_PADDINGS : NORMAL_PADDINGS)[size]

    return formatMarginPadding(padding, 'padding')
  }};
`

const BUTTON_ICON_STYLES: Partial<Record<GlobalSizes, ReturnType<typeof css>>> =
  {
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

interface ButtonStyleAnchorProps {
  // HTML
  a: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
  button: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
}

export interface ButtonProps extends BasicButtonProp, ButtonBaseProp {
  basic?: boolean
  icon?: string
  borderRadius?: number
  onClick?: (e: SyntheticEvent) => unknown
  as?: keyof ButtonStyleAnchorProps
}

export class Button extends PureComponent<ButtonProps> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static Container = ButtonContainer

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static Group = ButtonGroup

  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static Icon = ButtonIcon

  public render() {
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
        borderRadius={borderRadius ?? 21}
        onClick={onClick}
        {...props}
      >
        {children}
      </NormalButton>
    )
  }
}

import styled, { css } from 'styled-components'
import CSS from 'csstype'
import { ReactNode, PureComponent, HTMLAttributes } from 'react'

import { MarginPadding } from '../commons'
import { marginMixin } from '../mixins'

import Container from './container'

export type LabelColor =
  | 'blue'
  | 'red'
  | 'purple'
  | 'gray'
  | 'green'
  | 'white'
  | 'orange'
  | 'skyblue'
  | 'lightpurple'

const LABEL_COLORS: {
  [key in LabelColor]: {
    [key: string]: string
  }
} = {
  blue: {
    background: 'var(--color-blue100)',
    color: 'var(--color-blue)',
    emphasizedColor: 'var(--color-white)',
    emphasizedBackground: 'var(--color-blue)',
  },
  red: {
    background: 'var(--color-red100)',
    color: 'var(--color-red)',
    emphasizedColor: 'var(--color-white)',
    emphasizedBackground: 'var(--color-red)',
  },
  purple: {
    background: 'var(--color-purple100)',
    color: 'var(--color-purple)',
    emphasizedColor: 'var(--color-white)',
    emphasizedBackground: 'var(--color-purple)',
  },
  gray: {
    background: 'var(--color-gray50)',
    color: 'var(--color-gray700)',
    emphasizedColor: 'var(--color-white)',
    emphasizedBackground: 'var(--color-gray700)',
  },
  green: {
    background: 'var(--color-mint100)',
    color: 'var(--color-mint)',
    emphasizedColor: 'var(--color-white)',
    emphasizedBackground: 'var(--color-mint)',
  },
  /**
   * white, orange 의 경우 강조 타입만 정의된 상태
   */
  white: {
    background: 'var(--color-white)',
    color: 'var(--color-gray)',
    emphasizedColor: 'var(--color-gray)',
    emphasizedBackground: 'var(--color-white)',
    borderColor: 'var(--color-gray200)',
  },
  orange: {
    background: 'var(--color-white)',
    color: 'var(--color-orange)',
    emphasizedColor: 'var(--color-white)',
    emphasizedBackground: 'var(--color-orange)',
  },
  skyblue: {
    background: 'var(--color-skyblue)',
    color: 'var(--color-white)',
    emphasizedColor: 'var(--color-white)',
    emphasizedBackground: 'var(--color-skyblue)',
  },
  lightpurple: {
    background: 'var(--color-lightpurple)',
    color: 'var(--color-white)',
    emphasizedColor: 'var(--color-white)',
    emphasizedBackground: 'var(--color-lightpurple)',
  },
}

interface RadioLabelProps {
  selected?: boolean
  margin?: MarginPadding
}

const backgroundImage = ({ selected }: RadioLabelProps) =>
  `https://assets.triple.guide/images/img-search-select-${
    selected ? 'on' : 'off'
  }@4x.png`
const RadioLabel = styled.div<RadioLabelProps>`
  display: inline-block;
  padding-left: 9px;
  font-size: 14px;
  line-height: 17px;
  color: ${({ selected }) => (selected ? '#3a3a3a' : 'rgba(58, 58, 58, 0.3)')};
  background-image: url('${backgroundImage}');
  background-size: 5px 5px;
  background-position: left center;
  background-repeat: no-repeat;
  cursor: pointer;

  ${marginMixin}
`

const PROMO_SIZES = {
  tiny: {
    fontSize: 10,
    borderRadius: 1,
    height: 15,
    padding: '0 4px',
  },
  small: {
    fontSize: 11,
    borderRadius: 2,
    height: 20,
    padding: '0 6px',
  },
  medium: {
    fontSize: 12,
    borderRadius: 2,
    height: 26,
    padding: '0 10px',
  },
  large: {
    fontSize: 13,
    borderRadius: 4,
    height: 30,
    padding: '0 13px',
  },
}

interface PromoLabelProps {
  size?: keyof typeof PROMO_SIZES
  emphasized?: boolean
  color?: LabelColor
  margin?: MarginPadding
  verticalAlign?: CSS.Property.VerticalAlign<string>
}

export const PromoLabel = styled.div<PromoLabelProps>`
  display: inline-block;
  ${marginMixin}

  ${({ size = 'small' }) => {
    const { padding, borderRadius, height, fontSize } =
      PROMO_SIZES[size || 'small']
    return `
      padding: ${padding};
      border-radius: ${borderRadius}px;
      line-height: ${height}px;
      height: ${height}px;
      font-size: ${fontSize}px;
   `
  }}

  ${({ verticalAlign }) =>
    verticalAlign &&
    `
    vertical-align: ${verticalAlign};
  `}

  ${({ emphasized }) =>
    emphasized
      ? css<Pick<PromoLabelProps, 'color'>>`
          font-weight: bold;
          ${({ color = 'purple' }) => {
            const { emphasizedColor, emphasizedBackground, borderColor } =
              LABEL_COLORS[color]

            return css`
              background-color: ${emphasizedBackground};
              color: ${emphasizedColor};
              ${borderColor && `border: 1px solid ${borderColor}`};
            `
          }}
        `
      : css<Pick<PromoLabelProps, 'color'>>`
          font-weight: normal;
          ${({ color = 'purple' }) => {
            const { color: textColor, background } = LABEL_COLORS[color]
            return css`
              background-color: ${background};
              color: ${textColor};
            `
          }}
        `};
`

interface LabelProps extends PromoLabelProps, RadioLabelProps {
  radio?: boolean
  promo?: boolean
  children?: ReactNode
}

const LabelGroup = styled(Container)<{ horizontalGap?: number }>`
  div:not(:first-child) {
    ${({ horizontalGap }) => css`
      margin-left: ${horizontalGap || 0}px;
    `};
  }
`
class Label extends PureComponent<LabelProps, HTMLAttributes<HTMLElement>> {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  public static Group = LabelGroup

  public render() {
    const {
      props: {
        radio,
        selected,
        margin,
        children,
        promo,
        size,
        emphasized,
        color,
        ...props
      },
    } = this

    if (radio) {
      return (
        <RadioLabel {...props} selected={selected} margin={margin}>
          {children}
        </RadioLabel>
      )
    } else if (promo) {
      return (
        <PromoLabel
          {...props}
          size={size}
          emphasized={emphasized}
          color={color}
          margin={margin}
        >
          {children}
        </PromoLabel>
      )
    } else {
      return children
    }
  }
}

export default Label

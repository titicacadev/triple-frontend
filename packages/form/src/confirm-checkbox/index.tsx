import { ReactNode, SyntheticEvent } from 'react'
import styled, { css } from 'styled-components'
import * as CSS from 'csstype'
import { getColor } from '@titicaca/color-palette'
import { MarginPadding, paddingMixin } from '@titicaca/core-elements'

import withField from '../with-field'

type FillType = 'full' | 'border' | 'text'

const generateFillStyles = ({
  fillType,
  checked,
  error,
}: {
  fillType: FillType
  checked: boolean
  error?: boolean
}) => {
  if (!checked && !error) {
    return
  }

  const color = getColor(checked ? 'blue' : 'red')

  switch (fillType) {
    case 'full':
      return css`
        border-color: rgba(${color});
        & > * {
          color: rgba(${color});
          font-weight: bold;
        }
      `
    case 'border':
      return css`
        border-color: rgba(${color});
      `
    case 'text':
      return css`
        & > * {
          color: rgba(${color});
          font-weight: bold;
        }
      `
  }
}

const ConfirmFrame = styled.div.attrs({})<{
  name?: string
  textAlign?: CSS.Property.TextAlign
  borderless?: boolean
  checked?: boolean
  fillType?: FillType
  padding?: MarginPadding
  error?: boolean
}>`
  width: 100%;
  border: 1px solid #efefef;
  border-radius: 2px;
  box-sizing: border-box;
  position: relative;
  font-weight: bold;
  color: rgba(${getColor('gray500')});

  ${({ checked, error, fillType }) =>
    fillType && generateFillStyles({ checked: !!checked, error, fillType })};

  ${({ textAlign }) => `text-align: ${textAlign};`}

  ${({ borderless }) =>
    borderless &&
    css`
      border: none;
    `};

  ${paddingMixin}
`

const Icon = styled.span<{ borderless?: boolean; checked?: boolean }>`
  position: absolute;
  top: 50%;
  right: ${({ borderless }) => (borderless ? 0 : 16)}px;
  transform: translateY(-50%);
  display: inline-block;
  width: 29px;
  height: 29px;
  background-size: 29px 29px;
  background-repeat: no-repeat;
  background-image: url('https://assets.triple.guide/images/btn-web-check-off@2x.png');

  ${({ checked }) =>
    checked &&
    css`
      background-image: url('https://assets.triple.guide/images/btn-web-check-on@2x.png');
    `};
`

interface ConfirmCheckboxProps {
  name?: string
  value: boolean
  placeholder: string
  onChange?: (e?: SyntheticEvent, value?: boolean) => void
  textAlign?: CSS.Property.TextAlign
  borderless?: boolean
  fillType?: FillType
  children?: ReactNode
  padding?: MarginPadding
  error?: string
}

export default withField(
  ({
    name,
    value,
    children,
    onChange,
    textAlign = 'left',
    borderless,
    fillType,
    padding,
    error,
  }: ConfirmCheckboxProps) => {
    return (
      <ConfirmFrame
        name={name}
        onClick={(e) => onChange && onChange(e, !value)}
        checked={value}
        textAlign={textAlign}
        borderless={borderless}
        fillType={fillType}
        padding={padding}
        error={!!error}
      >
        {children}
        <Icon checked={value} borderless={borderless} />
      </ConfirmFrame>
    )
  },
)

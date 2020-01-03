import * as React from 'react'
import styled, { css } from 'styled-components'
import { withField } from '../utils/form-field'
import { GetGlobalColor, MarginPadding } from '../commons'

import * as CSS from 'csstype'
import { paddingMixin } from '../mixins'

type FillType = 'full' | 'border' | 'text'

const generateFillStyles = ({
  fillType,
  checked,
  error,
}: {
  fillType: FillType
  checked: boolean
  error: string
}) => {
  if (!checked && !error) {
    return
  }

  const color = GetGlobalColor(checked ? 'blue' : 'red')

  switch (fillType) {
    case 'full':
      return css`
        border-color: rgba(${color}, 1);
        & > * {
          color: rgba(${color}, 1);
          font-weight: bold;
        }
      `
    case 'border':
      return css`
        border-color: rgba(${color}, 1);
      `
    case 'text':
      return css`
        & > * {
          color: rgba(${color}, 1);
          font-weight: bold;
        }
      `
  }
}

const TextAligns: Partial<
  Record<CSS.TextAlignLastProperty, ReturnType<typeof css>>
> = {
  left: css`
    text-align: left;
  `,
  right: css`
    text-align: right;
  `,
}

// eslint-disable-next-line no-unexpected-multiline
const ConfirmFrame = styled.div.attrs({})<{
  name?: string
  textAlign?: string
  borderless?: boolean
  checked?: boolean
  fillType?: FillType
  padding?: MarginPadding
  error?: string
}>`
  width: 100%;
  border: 1px solid #efefef;
  border-radius: 2px;
  box-sizing: border-box;
  position: relative;
  font-weight: bold;
  color: rgba(${GetGlobalColor('gray')}, 0.5);

  ${({ checked, error, fillType }) =>
    fillType && generateFillStyles({ checked, error, fillType })};

  ${({ textAlign }) => textAlign && TextAligns[textAlign]};

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

interface ConfirmSelectorProps {
  name?: string
  value: any
  placeholder: string
  onChange?: (e?: React.SyntheticEvent, value?: any) => any
  textAlign?: CSS.TextAlignProperty
  borderless?: boolean
  fillType?: FillType
  children?: React.ReactNode
  padding?: MarginPadding
  error?: string
}

export const ConfirmSelector = withField(
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
  }: ConfirmSelectorProps) => {
    return (
      <ConfirmFrame
        name={name}
        onClick={(e) => onChange(e, !value)}
        checked={value}
        textAlign={textAlign}
        borderless={borderless}
        fillType={fillType}
        padding={padding}
        error={error}
      >
        {children}
        <Icon checked={value} borderless={borderless} />
      </ConfirmFrame>
    )
  },
)

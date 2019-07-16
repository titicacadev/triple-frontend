import * as React from 'react'
import styled, { css } from 'styled-components'
import Text from './text'
import { MarginPadding } from '../commons'

interface NumericProp {
  borderless?: boolean
  padding?: MarginPadding
}

const NumericFrame = styled.div<NumericProp>`
  position: relative;
  border: 1px solid #efefef;

  ${({ borderless }) =>
    borderless &&
    css`
      border: none;
    `};

  ${({ padding }) =>
    padding &&
    css`
      padding-top: ${padding.top}px;
      padding-right: ${padding.right}px;
      padding-bottom: ${padding.bottom}px;
      padding-left: ${padding.left}px;
    `};
`

const NumericContainer = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
  display: table;
  width: 30%;
`

const InnerContainer = styled.div<{ width?: number }>`
  position: relative;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: ${({ width }) => (width ? width : 100)}%;
`

const Icon = styled.span<{ active?: boolean; backgroundImageSrc?: string }>`
  display: inline-block;
  width: 34px;
  height: 34px;
  background-size: 34px 34px;
  background-repeat: no-repeat;
  background-position: -1px -1px;
  float: left;
  background-image: url(${({ backgroundImageSrc }) => backgroundImageSrc});
  opacity: ${({ active }) => (active ? 1 : 0.2)};
  cursor: pointer;
`

export default function NumricSpinner({
  label,
  sublabel,
  strikeLabel,
  value,
  max,
  min = 1,
  onChange,
  borderless,
  padding,
  size,
}: {
  label?: string
  sublabel?: string
  strikeLabel?: string
  value?: number
  max?: number
  min?: number
  onChange?: (arg1: number) => any
  borderless?: boolean
  padding?: MarginPadding
  size?: string
}) {
  const increment = (): void => {
    setQuantity(value + 1)
  }

  const decrement = (): void => {
    setQuantity(value - 1)
  }

  const setQuantity = (value: number): void => {
    if (value >= 0 && value <= max) {
      onChange(value)
    }
  }

  return (
    <NumericFrame borderless={borderless} padding={padding}>
      <Text size={size || 'small'}>{label}</Text>

      {sublabel ? (
        <Text size="mini" color="blue" inline>
          {sublabel}
        </Text>
      ) : null}

      {strikeLabel ? (
        <Text
          size="mini"
          color="gray"
          alpha="0.3"
          inline
          strikethrough
          margin={{ left: 2 }}
        >
          {strikeLabel}
        </Text>
      ) : null}

      <NumericContainer>
        <InnerContainer width={20}>
          <Icon
            active={value > 0}
            onClick={value <= min ? () => setQuantity(0) : decrement}
            backgroundImageSrc="https://assets.triple.guide/images/btn-numeric-minus@4x.png"
          />
        </InnerContainer>
        <InnerContainer width={60}>
          <Text size={size || 'medium'}>{value}</Text>
        </InnerContainer>
        <InnerContainer width={20}>
          <Icon
            active={value < max}
            onClick={value === 0 ? () => setQuantity(min) : increment}
            backgroundImageSrc="https://assets.triple.guide/images/btn-numeric-plus@4x.png"
          />
        </InnerContainer>
      </NumericContainer>
    </NumericFrame>
  )
}

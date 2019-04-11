import React from 'react'
import styled, { css } from 'styled-components'
import Text from './text'

const NumricFrame = styled.div`
  position: relative;
  border: 1px solid #efefef;

  ${({ borderless }) =>
    borderless &&
    css`
      border: none;
    `};
`

const NumericContainer = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
`

const InnerContainer = styled.div`
  position: relative;
`

const Icon = styled.span`
  display: inline-block;
  width: 36px;
  height: 36px;
  background-size: 36px 36px;
  background-repeat: no-repeat;
  background-position: -1px -1px;
  float: left;
  background-image: url(${({ backgroundImageSrc }) => backgroundImageSrc});
  opacity: ${({ active }) => (active ? 1 : 0.2)};
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
}) {
  const increment = () => {
    setQuantity(value + 1)
  }

  const decrement = () => {
    setQuantity(value - 1)
  }

  const setQuantity = (value) => {
    if (value >= 0 && value <= max) {
      onChange(value)
    }
  }

  return (
    <NumricFrame borderless={borderless} padding={padding}>
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
        <Icon
          active={value > 0}
          onClick={value <= min ? () => setQuantity(0) : decrement}
          backgroundImageSrc="https://assets.triple.guide/images/btn-web-minus@2x.png"
        />
        <Text
          floated="left"
          size={size || 'medium'}
          lineHeight="36px"
          margin={{ left: 5, right: 5 }}
        >
          {value}
        </Text>
        <Icon
          active={value < max}
          onClick={value === 0 ? () => setQuantity(min) : increment}
          backgroundImageSrc="https://assets.triple.guide/images/btn-web-plus@2x.png"
        />
      </NumericContainer>
    </NumricFrame>
  )
}

import React from 'react'
import styled from 'styled-components'
import Text from './text'

const NumricFrame = styled.div`
  position: relative;
  padding: 15px;
  margin-bottom: 10px;
  border: 1px solid #efefef;
  &:last-child {
    margin-bottom: 0;
  }
`

const NumericContainer = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;
`

const Icon = styled.span`
  display: inline-block;
  width: 34px;
  height: 34px;
  background-size: 34px 34px;
  background-repeat: no-repeat;
  background-position: -1px -1px;
  float: left;
  background-image: url(${({ backgroundImageSrc }) => backgroundImageSrc});
  opacity: ${({ active }) => (active ? 1 : 0.2)};
`

export default function NumricSpinner({
  label,
  subText,
  value,
  max,
  min = 1,
  onChange,
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
    <NumricFrame>
      <Text size="small" margin={{ bottom: 5 }}>
        {label}
      </Text>
      {subText ? <Text inline>{subText}</Text> : null}

      <NumericContainer>
        <Icon
          active={value > 0}
          onClick={value <= min ? () => setQuantity(0) : decrement}
          backgroundImageSrc="https://assets.triple.guide/images/btn-web-minus@2x.png"
        />
        <Text floated="left" lineHeight="34px" margin={{ left: 5, right: 5 }}>
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

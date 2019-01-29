import React from 'react'
import styled, { css } from 'styled-components'
import { formatNumber } from '../utilities'

const FONT_SIZE = {
  tiny: '12px',
  large: '18px',
  big: '20px',
}

const COLORS = {
  pink: 'rgba(253, 46, 105, 1)',
  gray: 'rgba(58, 58, 58, 0.3)',
  default: 'rgba(58, 58, 58, 1)',
}

const PricingContainer = styled.div`
  font-family: sans-serif;
  clear: both;
  position: relative;
  text-align: right;
  font-size: 18px;
  font-weight: bold;
  color: #3a3a3a;

  ${({ padding }) =>
    padding &&
    css`
      padding-top: ${padding.top || 0}px;
      padding-bottom: ${padding.bottom || 0}px;
      padding-left: ${padding.left || 0}px;
      padding-right: ${padding.right || 0}px;
    `};

  small {
    color: rgba(58, 58, 58, 0.3);
    font-weight: normal;
    font-size: 12px;
    display: inline-block;
    text-decoration: line-through;
    margin-right: 6px;
  }
`

const Price = styled.span`
  font-weight: normal;
  display: inline-block;
  font-size: ${({ size = 'tiny' }) => FONT_SIZE[size]};
  color: ${({ color = 'default' }) => COLORS[color]};
  font-weight: ${({ bold }) => (bold ? 'bold' : 500)};
  ${({ lineThrough }) =>
    lineThrough &&
    css`
      text-decoration: line-through;
    `};

  ${({ absolutePosition }) =>
    absolutePosition &&
    css`
      position: absolute;
      top: 5px;
      right: 0;
    `};

  ${({ margin }) =>
    margin &&
    css`
      margin-top: ${margin.top || 0}px;
      margin-bottom: ${margin.bottom || 0}px;
      margin-left: ${margin.left || 0}px;
      margin-right: ${margin.right || 0}px;
    `};
`

const Label = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  color: #368fff;
  font-size: 13px;
`

function discountRate(basePrice, salePrice) {
  return `${Math.floor(((basePrice - salePrice) / basePrice) * 100)}%`
}

function RichPricing({ basePrice, salePrice, label }) {
  return (
    <PricingContainer padding={{ top: 22 }}>
      <Label> {label} </Label>
      <Price color="gray" lineThrough absolutePosition>
        {formatNumber(salePrice)}
      </Price>
      <Price color="pink" size="big" margin={{ right: 5 }} bold>
        {discountRate(basePrice, salePrice)}
      </Price>
      <Price size="big" bold>
        {formatNumber(basePrice)}원
      </Price>
    </PricingContainer>
  )
}

const RegularPricing = ({ basePrice, salePrice }) => (
  <PricingContainer padding={{ top: 18 }}>
    <Price color="gray" lineThrough margin={{ right: 5 }}>
      {formatNumber(salePrice)}
    </Price>
    <Price size="large" bold>
      {formatNumber(basePrice)}원
    </Price>
  </PricingContainer>
)

export default function Pricing({ rich, ...props }) {
  return rich ? <RichPricing {...props} /> : <RegularPricing {...props} />
}

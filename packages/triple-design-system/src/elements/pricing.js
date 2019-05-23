import React from 'react'
import styled, { css } from 'styled-components'
import { formatNumber } from '../utilities'
import Container from './container'
import Text from './text'
import Drawer from './drawer'

const FONT_SIZE = {
  mini: '12px',
  tiny: '13px',
  small: '14px',
  large: '18px',
  big: '20px',
}

const COLORS = {
  pink: 'rgba(253, 46, 105, 1)',
  gray: 'rgba(58, 58, 58, 0.3)',
  blue: 'rgba(54, 143, 255)',
  white: 'rgba(255, 255, 255, 1)',
  default: 'rgba(58, 58, 58, 1)',
}

const PricingContainer = styled.div`
  clear: both;
  position: relative;
  text-align: right;
  font-size: ${FONT_SIZE.large};
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
    font-size: ${FONT_SIZE.mini};
    display: inline-block;
    text-decoration: line-through;
    margin-right: 6px;
  }
`

const Price = styled.span`
  font-weight: normal;
  display: inline-block;
  font-size: ${({ size = 'mini' }) => FONT_SIZE[size]};
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
  color: ${COLORS.blue};
  font-size: ${({ size }) => FONT_SIZE[size || 'tiny']};
`

const SuffixText = styled(Text)`
  letter-spacing: 2px;
  vertical-align: top;
`

function discountRate(basePrice, salePrice) {
  return `${Math.floor(((basePrice - salePrice) / basePrice) * 100)}%`
}

function RichPricing({ basePrice, salePrice, label }) {
  return (
    <PricingContainer padding={{ top: 22 }}>
      <Label> {label} </Label>
      <Price color="gray" lineThrough absolutePosition>
        {formatNumber(basePrice)}
      </Price>
      <Price color="pink" size="big" margin={{ right: 5 }} bold>
        {discountRate(basePrice, salePrice)}
      </Price>
      <Price size="big" bold>
        {formatNumber(salePrice)}원
      </Price>
    </PricingContainer>
  )
}

const RegularPricing = ({ basePrice, salePrice }) => (
  <PricingContainer padding={{ top: 18 }}>
    <Price color="gray" lineThrough margin={{ right: 5 }}>
      {formatNumber(basePrice)}
    </Price>
    <Price size="large" bold>
      {formatNumber(salePrice)}원
    </Price>
  </PricingContainer>
)

const FloatedFrame = styled(Container)`
  @supports (padding: max(0px)) and (padding: env(safe-area-inset-bottom)) {
    padding-bottom: max(10px, env(safe-area-inset-bottom, 10px));
  }
`

const FloatedPricingContainer = styled(Container)`
  width: ${({ width }) => width || 100}%;
`

const ReservationButton = styled.button`
  width: 100%;
  padding: 17px 0;
  border-radius: 4px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: ${FONT_SIZE.small};
  border: none;
`

function FixedPricing({
  active,
  label,
  buttonText,
  salePrice,
  suffix,
  onClick,
}) {
  return (
    <Drawer active={active}>
      <FloatedFrame
        clearing
        padding={{ top: 10, right: 25, bottom: 10, left: 30 }}
      >
        <FloatedPricingContainer width={50} floated="left">
          <Text color="blue" size="mini" margin={{ top: 7, bottom: 4 }}>
            {label}
          </Text>
          <Text size="large" bold>
            {formatNumber(salePrice)}원
            {suffix ? (
              <SuffixText
                inline
                size="small"
                margin={{ top: 1, left: 4 }}
                alpha={0.6}
              >
                /{suffix}
              </SuffixText>
            ) : null}
          </Text>
        </FloatedPricingContainer>
        <FloatedPricingContainer width={50} floated="right">
          <ReservationButton onClick={onClick}>{buttonText}</ReservationButton>
        </FloatedPricingContainer>
      </FloatedFrame>
    </Drawer>
  )
}

export default function Pricing({ rich, fixed, ...props }) {
  const Container = rich ? RichPricing : fixed ? FixedPricing : RegularPricing
  return <Container {...props} />
}

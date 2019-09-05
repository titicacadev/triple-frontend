import * as React from 'react'
import styled, { css } from 'styled-components'
import { formatNumber } from '@titicaca/view-utilities'

import Container from './container'
import Text from './text'
import Drawer from './drawer'
import { GlobalSizes, GlobalColors, MarginPadding } from '../commons'

const FONT_SIZE: Partial<Record<GlobalSizes, string>> = {
  mini: '12px',
  tiny: '13px',
  small: '14px',
  large: '18px',
  big: '20px',
}

type PricingColors = GlobalColors | 'pink' | 'default'

const COLORS: Partial<Record<PricingColors, string>> = {
  pink: 'rgba(253, 46, 105, 1)',
  gray: 'rgba(58, 58, 58, 0.3)',
  blue: 'rgba(54, 143, 255, 1)',
  white: 'rgba(255, 255, 255, 1)',
  default: 'rgba(58, 58, 58, 1)',
}

const PricingContainer = styled.div<{ padding?: MarginPadding }>`
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

// eslint-disable-next-line no-unexpected-multiline
const Price = styled.span<{
  size?: GlobalSizes
  bold?: boolean
  lineThrough?: boolean
  absolutePosition?: boolean
  margin?: MarginPadding
  color?: PricingColors
}>`
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

const Label = styled.div<{ size?: GlobalSizes }>`
  position: absolute;
  left: 0;
  bottom: 0;
  color: ${COLORS.blue};
  font-size: ${({ size }) => FONT_SIZE[size || 'tiny']};
`

function discountRate(basePrice: number, salePrice: number) {
  return `${Math.floor(((basePrice - salePrice) / basePrice) * 100)}%`
}

function RichPricing({
  basePrice,
  salePrice,
  label,
}: {
  basePrice: number
  salePrice: number
  label: React.ReactNode
}) {
  const pricingLabel = label ? (
    typeof label === 'string' ? (
      <Label> {label} </Label>
    ) : (
      label
    )
  ) : null

  return (
    <PricingContainer padding={{ top: 22 }}>
      {pricingLabel}
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

const RegularPricing = ({
  basePrice,
  salePrice,
}: {
  basePrice: number
  salePrice: number
}) => (
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
  position: relative;
  border-top: 1px solid #efefef;

  @supports (padding: max(0px)) and (padding: env(safe-area-inset-bottom)) {
    padding-bottom: max(10px, env(safe-area-inset-bottom, 10px));
  }
`

const FloatedPricingContainer = styled(Container)`
  width: 50%;
`

const PurchaseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 18px;
  width: 41%;
  height: 45px;
  border-radius: 4px;
  background: ${COLORS.blue};
  color: ${COLORS.white};
  font-size: ${FONT_SIZE.small};
  font-weight: bold;
  border: none;
  cursor: pointer;
`

function FixedPricing({
  active,
  label,
  buttonText,
  description,
  salePrice,
  onClick,
}: {
  active?: boolean
  label?: React.ReactNode
  description?: string
  buttonText?: string
  salePrice?: number
  onClick?: (e?: React.SyntheticEvent) => any
}) {
  const pricingLabel = label ? (
    typeof label === 'string' ? (
      <Text color="blue" size="mini">
        {label}
      </Text>
    ) : (
      label
    )
  ) : null

  return (
    <Drawer active={active}>
      <FloatedFrame
        clearing
        padding={{
          top: description ? 12 : 20,
          right: 20,
          bottom: description ? 13 : 20,
          left: 20,
        }}
      >
        <FloatedPricingContainer floated="left">
          {pricingLabel}
          <Text size="huge" bold>
            {formatNumber(salePrice)}원
          </Text>
          {description ? (
            <Text color="blue" size="tiny" bold>
              {description}
            </Text>
          ) : null}
        </FloatedPricingContainer>
        <PurchaseButton onClick={onClick}>{buttonText}</PurchaseButton>
      </FloatedFrame>
    </Drawer>
  )
}

export default function Pricing({
  basePrice,
  salePrice,
  label,
  active,
  buttonText,
  onClick,
  rich,
  fixed,
  description,
}: {
  basePrice?: number
  salePrice?: number
  label?: React.ReactNode
  active?: boolean
  buttonText?: string
  onClick?: (e?: React.SyntheticEvent) => any
  rich?: boolean
  fixed?: boolean
  description?: string
}) {
  if (rich) {
    return (
      <RichPricing basePrice={basePrice} salePrice={salePrice} label={label} />
    )
  } else if (fixed) {
    return (
      <FixedPricing
        active={active}
        label={label}
        buttonText={buttonText}
        salePrice={salePrice}
        description={description}
        onClick={onClick}
      />
    )
  } else {
    return <RegularPricing basePrice={basePrice} salePrice={salePrice} />
  }
}

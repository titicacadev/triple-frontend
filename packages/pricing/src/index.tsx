import * as React from 'react'
import styled, { css } from 'styled-components'
import { formatNumber } from '@titicaca/view-utilities'
import {
  Container,
  Text,
  GlobalSizes,
  MarginPadding,
  GlobalColors,
} from '@titicaca/core-elements'

import FixedPricing, { FixedPricingProps } from './fixed-pricing'

export type BasePrice = number | null

interface RegularPricingProps {
  basePrice?: BasePrice
  salePrice?: number
  priceLabelOverride?: string
}

interface RichPricingProps {
  basePrice?: BasePrice
  basePriceUnit?: string
  salePrice?: number
  label?: React.ReactNode
  pricingNote?: string
  description?: React.ReactNode
  priceLabelOverride?: string
  isVisibleDiscountRate?: boolean
}

type PricingProps =
  | ({ rich: true; fixed?: false } & RichPricingProps)
  | ({ rich?: false; fixed: true } & FixedPricingProps)
  | ({ rich?: false; fixed?: false } & RegularPricingProps)

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

const Price = styled.span<{
  size?: GlobalSizes
  bold?: boolean
  lineThrough?: boolean
  margin?: MarginPadding
  color?: PricingColors
}>`
  display: inline-block;
  font-size: ${({ size = 'mini' }) => FONT_SIZE[size]};
  color: ${({ color = 'default' }) => COLORS[color]};
  font-weight: ${({ bold }) => (bold ? 'bold' : 500)};
  ${({ lineThrough }) =>
    lineThrough &&
    css`
      text-decoration: line-through;
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

function DiscountRate({
  basePrice,
  salePrice,
}: {
  basePrice: number
  salePrice: number
}) {
  const rate = Math.floor(((basePrice - salePrice) / basePrice) * 100)

  return rate > 0 ? (
    <Price color="pink" size="big" margin={{ right: 5 }} bold>
      {rate}%
    </Price>
  ) : null
}

function RichPricing({
  basePrice,
  salePrice = 0,
  label,
  pricingNote,
  description,
  basePriceUnit,
  priceLabelOverride,
  isVisibleDiscountRate = true,
}: RichPricingProps) {
  const pricingDescription = description ? (
    typeof description === 'string' ? (
      <Text size="tiny" alpha={0.8} margin={{ top: 3 }}>
        {description}
      </Text>
    ) : (
      description
    )
  ) : null

  const hasBasePrice =
    typeof basePrice === 'number' && basePrice > 0 && basePrice > salePrice

  return (
    <Container textAlign="right">
      <PricingContainer>
        {label ? <Label> {label} </Label> : null}

        {(pricingNote || hasBasePrice) && (
          <Container margin={{ bottom: 1 }}>
            {pricingNote && (
              <Text alpha={0.3} size="mini" inlineBlock margin={{ right: 3 }}>
                {pricingNote}
              </Text>
            )}

            {hasBasePrice && (
              <Text alpha={0.3} size="mini" strikethrough inline>
                {formatNumber(basePrice)}
                {basePriceUnit}
              </Text>
            )}
          </Container>
        )}

        {isVisibleDiscountRate && hasBasePrice ? (
          <DiscountRate basePrice={basePrice as number} salePrice={salePrice} /> // HACK: hasBasePrice가 true면 basePrice는 무조건 number이다.
        ) : null}

        <Price size="big" bold>
          {priceLabelOverride || `${formatNumber(salePrice)}원`}
        </Price>
      </PricingContainer>
      {pricingDescription}
    </Container>
  )
}

const RegularPricing = ({
  basePrice,
  salePrice = 0,
  priceLabelOverride,
}: RegularPricingProps) => {
  const hasBasePrice =
    typeof basePrice === 'number' && basePrice > 0 && basePrice > salePrice

  return (
    <PricingContainer padding={{ top: 18 }}>
      {hasBasePrice && (
        <Price color="gray" lineThrough margin={{ right: 5 }}>
          {formatNumber(basePrice)}
        </Price>
      )}
      <Price size="large" bold>
        {priceLabelOverride || `${formatNumber(salePrice)}원`}
      </Price>
    </PricingContainer>
  )
}

export default function Pricing(props: PricingProps) {
  const { salePrice, priceLabelOverride } = props

  if (props.rich) {
    const {
      basePrice,
      label,
      pricingNote,
      description,
      basePriceUnit,
      isVisibleDiscountRate,
    } = props

    return (
      <RichPricing
        basePrice={basePrice}
        priceLabelOverride={priceLabelOverride}
        basePriceUnit={basePriceUnit}
        salePrice={salePrice}
        label={label}
        pricingNote={pricingNote}
        description={description}
        isVisibleDiscountRate={isVisibleDiscountRate}
      />
    )
  } else if (props.fixed) {
    const {
      active,
      label,
      buttonText,
      buttonDisabled,
      description,
      onClick,
      tooltipLabel,
      onTooltipClick,
    } = props

    return (
      <FixedPricing
        active={active}
        label={label}
        buttonText={buttonText}
        buttonDisabled={buttonDisabled}
        salePrice={salePrice}
        description={description}
        onClick={onClick}
        priceLabelOverride={priceLabelOverride}
        tooltipLabel={tooltipLabel}
        onTooltipClick={onTooltipClick}
      />
    )
  } else {
    const { basePrice } = props

    return (
      <RegularPricing
        basePrice={basePrice}
        salePrice={salePrice}
        priceLabelOverride={priceLabelOverride}
      />
    )
  }
}

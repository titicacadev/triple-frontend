import * as React from 'react'
import styled, { css } from 'styled-components'
import { formatNumber } from '@titicaca/view-utilities'
import {
  Container,
  Text,
  Drawer,
  GlobalSizes,
  GlobalColors,
  MarginPadding,
} from '@titicaca/core-elements'

interface RegularPricingProps {
  basePrice?: number
  salePrice: number
}

interface RichPricingProps {
  basePrice?: number
  salePrice: number
  label?: React.ReactNode
  pricingNote?: string
}

interface FixedPricingProps {
  active?: boolean
  label?: React.ReactNode
  description?: string | React.ReactNode
  buttonText?: string
  salePrice: number
  onClick?: (e?: React.SyntheticEvent) => any
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
  salePrice,
  label,
  pricingNote,
}: RichPricingProps) {
  const pricingLabel = label ? (
    typeof label === 'string' ? (
      <Label> {label} </Label>
    ) : (
      label
    )
  ) : null

  const hasBasePrice = basePrice !== undefined && basePrice > 0

  return (
    <PricingContainer>
      {pricingLabel}

      {(pricingNote || hasBasePrice) && (
        <Container margin={{ bottom: 3 }}>
          {pricingNote && (
            <Text alpha={0.3} size="mini" inlineBlock margin={{ right: 3 }}>
              {pricingNote}
            </Text>
          )}
          {hasBasePrice && (
            <Text alpha={0.3} size="mini" strikethrough inline>
              {formatNumber(basePrice)}
            </Text>
          )}
        </Container>
      )}

      {hasBasePrice ? (
        <DiscountRate basePrice={basePrice as number} salePrice={salePrice} /> // HACK: hasBasePrice가 true면 basePrice는 무조건 number이다.
      ) : null}

      <Price size="big" bold>
        {formatNumber(salePrice)}원
      </Price>
    </PricingContainer>
  )
}

const RegularPricing = ({ basePrice, salePrice }: RegularPricingProps) => {
  const hasBasePrice = basePrice !== undefined && basePrice > 0

  return (
    <PricingContainer padding={{ top: 18 }}>
      {hasBasePrice && (
        <Price color="gray" lineThrough margin={{ right: 5 }}>
          {formatNumber(basePrice)}
        </Price>
      )}
      <Price size="large" bold>
        {formatNumber(salePrice)}원
      </Price>
    </PricingContainer>
  )
}

const FloatedFrame = styled(Container)`
  border-top: 1px solid #efefef;
  background: #fff;
  @supports (padding: max(0px)) and (padding: env(safe-area-inset-bottom)) {
    padding-bottom: max(14px, env(safe-area-inset-bottom, 14px));
  }
`

const FloatedPricingContainer = styled(Container)`
  width: 50%;
`

const PurchaseButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 41%;
  height: 47px;
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
}: FixedPricingProps) {
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
    <Drawer active={active} overflow="visible">
      <FloatedFrame
        padding={{
          top: 14,
          right: 20,
          bottom: 14,
          left: 20,
        }}
      >
        <Container position="relative" clearing>
          <FloatedPricingContainer floated="left">
            {pricingLabel}
            <Text size="huge" bold>
              {formatNumber(salePrice)}원
            </Text>
            {description ? (
              <Text size="mini" alpha={0.5} margin={{ top: 2 }}>
                {description}
              </Text>
            ) : null}
          </FloatedPricingContainer>
          <PurchaseButton onClick={onClick}>{buttonText}</PurchaseButton>
        </Container>
      </FloatedFrame>
    </Drawer>
  )
}

export default function Pricing(props: PricingProps) {
  const { salePrice } = props

  if (props.rich) {
    const { basePrice, label, pricingNote } = props

    return (
      <RichPricing
        basePrice={basePrice}
        salePrice={salePrice}
        label={label}
        pricingNote={pricingNote}
      />
    )
  } else if (props.fixed) {
    const { active, label, buttonText, description, onClick } = props

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
    const { basePrice } = props

    return <RegularPricing basePrice={basePrice} salePrice={salePrice} />
  }
}

import React from 'react'
import styled from 'styled-components'
import {
  Container,
  Drawer,
  Tooltip,
  Text,
  Button,
} from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'

export interface FixedPricingProps {
  active?: boolean
  label?: React.ReactNode
  discountRate?: React.ReactNode
  description?: React.ReactNode
  buttonText?: string
  buttonDisabled?: boolean
  salePrice?: number
  isSoldOut?: boolean
  priceLabelOverride?: string
  tooltipLabel?: string
  onClick?: (e?: React.SyntheticEvent) => any
  onTooltipClick?: (e?: React.SyntheticEvent) => any
  maxWidth?: number
  tooltipColor?: string
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

const PurchaseButtonContainer = styled(Container)`
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 41%;
  height: 47px;
`

export default function FixedPricing({
  active,
  label,
  buttonText,
  buttonDisabled,
  description,
  salePrice,
  tooltipLabel,
  tooltipColor,
  discountRate,
  onClick,
  priceLabelOverride,
  onTooltipClick,
  isSoldOut = false,
  maxWidth,
}: FixedPricingProps) {
  const pricingLabel = label ? (
    typeof label === 'string' ? (
      <Text color="gray" alpha={0.5} size="mini">
        {label}
      </Text>
    ) : (
      label
    )
  ) : null

  const pricingDescription = description ? (
    typeof description === 'string' ? (
      <Text size="mini" alpha={0.5} margin={{ top: 1 }}>
        {description}
      </Text>
    ) : (
      description
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
        <Container
          position="relative"
          clearing
          maxWidth={maxWidth}
          centered={!!maxWidth}
        >
          {active && tooltipLabel && (
            <Tooltip
              borderRadius="30"
              backgroundColor={tooltipColor}
              positioning={{ top: -34 }}
              label={tooltipLabel}
              onClick={onTooltipClick}
            />
          )}
          <FloatedPricingContainer floated="left">
            {pricingLabel}
            <Text
              size="huge"
              bold
              margin={{ bottom: 3 }}
              color={isSoldOut ? 'gray300' : 'gray'}
            >
              {priceLabelOverride || `${formatNumber(salePrice)}원`}
              {discountRate}
            </Text>
            {pricingDescription}
          </FloatedPricingContainer>

          <PurchaseButtonContainer position="absolute">
            <Button
              as="button"
              fluid
              borderRadius={4}
              size="small"
              color="blue"
              disabled={buttonDisabled}
              onClick={onClick}
            >
              {buttonText}
            </Button>
          </PurchaseButtonContainer>
        </Container>
      </FloatedFrame>
    </Drawer>
  )
}

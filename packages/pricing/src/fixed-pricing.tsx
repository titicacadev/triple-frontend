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
  description?: React.ReactNode
  buttonText?: string
  buttonDisabled?: boolean
  salePrice: number
  tooltipLabel?: string
  onClick?: (e?: React.SyntheticEvent) => any
  onTooltipClick?: (e?: React.SyntheticEvent) => any
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
  onClick,
  onTooltipClick,
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
        {active && tooltipLabel && (
          <Tooltip
            borderRadius="30"
            positioning={{ top: -20 }}
            label={tooltipLabel}
            onClick={onTooltipClick}
          />
        )}

        <Container position="relative" clearing>
          <FloatedPricingContainer floated="left">
            {pricingLabel}
            <Text size="huge" bold>
              {formatNumber(salePrice)}원
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

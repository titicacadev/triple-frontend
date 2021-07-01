import React from 'react'
import styled, { css } from 'styled-components'
import {
  Container,
  Drawer,
  Tooltip,
  Text,
  Button,
  MarginPadding,
  Skeleton,
} from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'

import LoadingIndicator from './loading-indicator'

export interface FixedPricingV2Props {
  loading: boolean
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
  padding?: MarginPadding
  emptyOverride?: React.ReactNode
}

const FloatedFrame = styled(Container)`
  border-top: 1px solid #efefef;
  background: #fff;

  @supports (padding: max(0px)) and (padding: env(safe-area-inset-bottom)) {
    ${({ padding }) =>
      padding?.bottom
        ? css`
            padding-bottom: max(
              ${padding.bottom}px,
              env(safe-area-inset-bottom, ${padding.bottom}px)
            );
          `
        : css`
            padding-bottom: max(14px, env(safe-area-inset-bottom, 14px));
          `}
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

function LoadingSkeleton() {
  return (
    <>
      <Container clearing>
        <Skeleton borderRadius={2} floated="left" width="40%" height={20} />
      </Container>
      <Container clearing margin={{ top: 5 }}>
        <Skeleton borderRadius={2} floated="left" width="60%" height={22} />
      </Container>
      <Container clearing margin={{ top: 5 }}>
        <Skeleton borderRadius={2} floated="left" width="100%" height={15} />
      </Container>
    </>
  )
}

export default function FixedPricingV2({
  emptyOverride,
  loading,
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
  padding = { top: 14, right: 20, bottom: 14, left: 20 },
}: FixedPricingV2Props) {
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
      <FloatedFrame padding={padding}>
        <Container
          position="relative"
          clearing
          maxWidth={maxWidth}
          centered={!!maxWidth}
        >
          {emptyOverride || (
            <>
              {!loading && active && tooltipLabel && (
                <Tooltip
                  borderRadius="30"
                  backgroundColor={tooltipColor}
                  positioning={{ top: -34 }}
                  label={tooltipLabel}
                  onClick={onTooltipClick}
                />
              )}
              <FloatedPricingContainer floated="left">
                {loading ? (
                  <LoadingSkeleton />
                ) : (
                  <>
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
                  </>
                )}
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
                  {loading ? (
                    <LoadingIndicator loading={loading} />
                  ) : (
                    buttonText
                  )}
                </Button>
              </PurchaseButtonContainer>
            </>
          )}
        </Container>
      </FloatedFrame>
    </Drawer>
  )
}

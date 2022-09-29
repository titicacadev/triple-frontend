import { ReactNode, SyntheticEvent } from 'react'
import styled, { css } from 'styled-components'
import {
  Container,
  Drawer,
  Tooltip,
  Text,
  MarginPadding,
  Skeleton,
  safeAreaInsetMixin,
} from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { CSSProps } from '@titicaca/core-elements/lib/css'

import PurchaseButton from './purchase-button'

export interface FixedPricingV2Props {
  loading: boolean
  active?: boolean
  label?: ReactNode
  discountRate?: ReactNode
  description?: ReactNode
  buttonText?: string
  buttonDisabled?: boolean
  salePrice?: number
  isSoldOut?: boolean
  priceLabelOverride?: string
  tooltipLabel?: string
  onClick?: (e?: SyntheticEvent) => void
  onTooltipClick?: (e?: SyntheticEvent) => void
  maxWidth?: number
  tooltipColor?: string
  padding?: MarginPadding
  emptyOverride?: ReactNode
}

const FloatedFrame = styled(Container)`
  border-top: 1px solid #efefef;
  background: #fff;

  ${safeAreaInsetMixin}
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
        <Skeleton
          borderRadius={2}
          floated="left"
          css={{
            width: '40%',
            height: 20,
          }}
        />
      </Container>
      <Container
        clearing
        css={{
          margin: '5px 0 0 0',
        }}
      >
        <Skeleton
          borderRadius={2}
          floated="left"
          css={{
            width: '60%',
            height: 22,
          }}
        />
      </Container>
      <Container
        clearing
        css={{
          margin: '5px 0 0 0',
        }}
      >
        <Skeleton
          borderRadius={2}
          floated="left"
          css={{
            width: '100%',
            height: 15,
          }}
        />
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
  css: cssProp,
}: FixedPricingV2Props & CSSProps) {
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
      <FloatedFrame css={css({ padding: '14px 20px 14px 20px' }, cssProp)}>
        <Container
          position="relative"
          clearing
          centered={!!maxWidth}
          css={{
            maxWidth,
          }}
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
                <PurchaseButton
                  loading={loading}
                  disabled={buttonDisabled}
                  buttonText={buttonText}
                  onClick={onClick}
                />
              </PurchaseButtonContainer>
            </>
          )}
        </Container>
      </FloatedFrame>
    </Drawer>
  )
}

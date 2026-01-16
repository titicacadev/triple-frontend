import { MouseEventHandler, SyntheticEvent, useCallback } from 'react'
import { useTranslation, useClientApp } from '@titicaca/triple-web'
import { Text, Tag, Container, Image, Rating } from '@titicaca/tds-ui'
import { OverlayScrapButton } from '@titicaca/tds-widget'
import { formatNumber } from '@titicaca/view-utilities'
import { InView } from 'react-intersection-observer'

import { TnaProductData, DomesticArea } from './types'
import { useGenerateCoupon } from './use-generate-coupon'
import { PricePolicyCouponInfo } from './price-policy-coupon-info'

const PLACEHOLDER_IMAGE_URL =
  'https://assets.triple.guide/images/ico_blank_see@2x.png'

function Pricing({
  basePrice, // 판매가
  salePrice, // 표시가
}: Parameters<typeof Container>[0] & {
  basePrice?: number
  salePrice: number
}) {
  const t = useTranslation()

  const formattedBasePrice = formatNumber(basePrice)
  const formattedSalePrice = formatNumber(salePrice)

  const rate = basePrice
    ? Math.floor(((basePrice - salePrice) / basePrice) * 100)
    : null

  return (
    <Container
      css={{
        margin: '10px 0 0',
      }}
    >
      {rate ? (
        <Container
          css={{
            margin: '0 0 1px',
          }}
        >
          <Text color="red" bold size={18}>
            {rate}%
          </Text>
        </Container>
      ) : null}

      <Container>
        {salePrice > 0 ? (
          <Text inline bold size={18} color="gray">
            {t('{{formattedSalePrice}}원', {
              formattedSalePrice,
            })}
          </Text>
        ) : (
          <Text inline bold size={18} color="gray300">
            {t('일시품절')}
          </Text>
        )}

        {basePrice ? (
          <Text
            inline
            color="gray300"
            size="mini"
            strikethrough
            margin={{ left: 5 }}
          >
            {t('{{formattedBasePrice}}원', {
              formattedBasePrice,
            })}
          </Text>
        ) : null}
      </Container>
    </Container>
  )
}

export function TnaProductWithPrice({
  product,
  product: {
    id,
    title,
    heroImage,
    tags,
    salePrice: rawSalePrice,
    basePrice: rawBasePrice,
    reviewRating,
    reviewsCount,
    domesticAreas = [],
    applicableCoupon,
    expectedApplicableCoupon,
    scraped,
    bestSelfPackageDiscountSpec,
  },
  index,
  onIntersect,
  onClick,
}: {
  index: number
  product: TnaProductData
  onClick: (e: SyntheticEvent, product: TnaProductData, index: number) => void
  onIntersect: (product: TnaProductData, index: number) => void
}) {
  const t = useTranslation()
  const app = useClientApp()

  const salePrice =
    typeof rawSalePrice === 'string' ? parseInt(rawSalePrice) : rawSalePrice
  const basePrice =
    typeof rawBasePrice === 'string' ? parseInt(rawBasePrice) : rawBasePrice
  const primaryDomesticArea: DomesticArea | undefined =
    domesticAreas.find(({ representative }) => representative) ||
    domesticAreas[0]
  const {
    hasCoupon,
    hasOnlyExpectedApplicableCoupon,
    hasAmountAfterUsingCouponPrice,
    displayPricePolicy,
  } = useGenerateCoupon({
    applicableCoupon,
    expectedApplicableCoupon,
  })
  const hasSelfPackageBenefit = !!bestSelfPackageDiscountSpec

  const handleIntersectionChange = useCallback(
    (inView: boolean) => {
      if (inView) {
        onIntersect(product, index)
      }
    },
    [index, onIntersect, product],
  )

  const handleClick: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      onClick(e, product, index)
    },
    [index, onClick, product],
  )

  return (
    <InView onChange={handleIntersectionChange}>
      <Container onClick={handleClick} clearing>
        <Image>
          <Image.FixedDimensionsFrame size="small" width={90} floated="left">
            {heroImage ? (
              <Image.Img
                src={heroImage}
                alt={t('{{title}}의 썸네일', { title })}
              />
            ) : (
              <Image.Placeholder src={PLACEHOLDER_IMAGE_URL} />
            )}
          </Image.FixedDimensionsFrame>
        </Image>

        {!app ? (
          <Container
            position="absolute"
            css={{
              top: '3px',
              left: '51px',
            }}
          >
            <OverlayScrapButton
              resource={{ id, scraped, type: 'tna' }}
              size={36}
            />
          </Container>
        ) : null}

        <Container
          css={{
            margin: '0 0 0 104px',
          }}
        >
          <Text bold size="large" color="gray" ellipsis maxLines={2}>
            {title}
          </Text>

          {primaryDomesticArea && (
            <Text color="gray400" size="tiny" margin={{ top: 4 }}>
              {primaryDomesticArea.displayName}
            </Text>
          )}

          {tags && tags.length > 0 && (
            <Container
              css={{
                margin: '3px 0 0',
              }}
            >
              {tags.map(({ text, type, style }, i) => (
                <Tag
                  key={i}
                  type={type}
                  style={style}
                  margin={{ top: 4, right: i < tags.length - 1 ? 4 : 0 }}
                >
                  {text}
                </Tag>
              ))}
            </Container>
          )}

          {reviewsCount ? (
            <Container
              css={{
                display: 'flex',
                alignItems: 'flex-end',
                margin: '4px 0 0',
                height: 16,
              }}
            >
              <Rating size="tiny" score={reviewRating} />
              <Text
                inlineBlock
                size="tiny"
                color="gray400"
                lineHeight={1.08}
                margin={{ left: 3 }}
              >
                ({reviewsCount})
              </Text>
            </Container>
          ) : null}

          {salePrice !== undefined ? (
            <Pricing
              salePrice={salePrice}
              basePrice={
                !!basePrice && salePrice < basePrice ? basePrice : undefined
              }
            />
          ) : null}

          {hasCoupon && (
            <PricePolicyCouponInfo
              hasOnlyExpectedApplicableCoupon={hasOnlyExpectedApplicableCoupon}
              hasAmountAfterUsingCouponPrice={hasAmountAfterUsingCouponPrice}
              displayPricePolicy={displayPricePolicy}
            />
          )}

          {hasSelfPackageBenefit && (
            <Text bold size="small" color="gray700" margin={{ top: 4 }}>
              {t('셀프패키지 추가할인 가능')}
            </Text>
          )}
        </Container>
      </Container>
    </InView>
  )
}

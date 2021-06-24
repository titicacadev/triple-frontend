import React, { MouseEventHandler, useCallback } from 'react'
import { Text, Tag, Container, Image, Rating } from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import { StaticIntersectionObserver } from '@titicaca/intersection-observer'

import { TNAProductData } from './types'
import { generateCoupon } from './helpers'

const PLACEHOLDER_IMAGE_URL =
  'https://assets.triple.guide/images/ico-blank-see@2x.png'

function Pricing({
  basePrice,
  salePrice,
}: Parameters<typeof Container>[0] & {
  basePrice?: number
  salePrice: number
}) {
  const rate = basePrice
    ? Math.floor(((basePrice - salePrice) / basePrice) * 100)
    : null

  return (
    <Container margin={{ top: 10 }}>
      {rate ? (
        <Container margin={{ bottom: 2 }}>
          <Text color="red" bold>
            {rate}%
          </Text>
        </Container>
      ) : null}

      <Container>
        <Text inline bold size={18} color="gray">
          {`${formatNumber(salePrice)}원`}
        </Text>

        {basePrice ? (
          <Text
            inline
            color="gray300"
            size="mini"
            strikethrough
            margin={{ left: 5 }}
          >{`${formatNumber(basePrice)}원`}</Text>
        ) : null}
      </Container>
    </Container>
  )
}

export function TnaProductWithPrice({
  product,
  product: {
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
  },
  index,
  onIntersect,
  onClick,
}: {
  index: number
  product: TNAProductData
  onClick: (
    e: React.SyntheticEvent,
    product: TNAProductData,
    index: number,
  ) => void
  onIntersect: (product: TNAProductData, index: number) => void
}) {
  const salePrice =
    typeof rawSalePrice === 'string' ? parseInt(rawSalePrice) : rawSalePrice
  const basePrice =
    typeof rawBasePrice === 'string' ? parseInt(rawBasePrice) : rawBasePrice
  const hasAreaName = domesticAreas.length > 0
  const areaName =
    domesticAreas.find(({ representative }) => representative)?.displayName ||
    domesticAreas[0].displayName
  const {
    hasCoupon,
    hasOnlyExpectedApplicableCoupon,
    displayDiscountPolicy,
  } = generateCoupon({
    applicableCoupon,
    expectedApplicableCoupon,
  })

  const handleIntersectionChange = useCallback(
    ({ isIntersecting }: IntersectionObserverEntry) => {
      if (isIntersecting) {
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
    <StaticIntersectionObserver onChange={handleIntersectionChange}>
      <Container onClick={handleClick} clearing>
        <Image>
          <Image.FixedDimensionsFrame size="small" width={90} floated="left">
            {heroImage ? (
              <Image.Img src={heroImage} alt={`${title}의 썸네일`} />
            ) : (
              <Image.Placeholder src={PLACEHOLDER_IMAGE_URL} />
            )}
          </Image.FixedDimensionsFrame>
        </Image>

        <Container margin={{ left: 104 }}>
          <Text bold size="large" color="gray" ellipsis>
            {title}
          </Text>

          {hasAreaName && (
            <Text color="gray400" size="tiny" margin={{ top: 4 }}>
              {areaName}
            </Text>
          )}

          {tags && tags.length > 0 && (
            <Container margin={{ top: 3 }}>
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
            <Container margin={{ top: 4 }}>
              <Rating size="tiny" score={reviewRating} />
              <Text
                inlineBlock
                size="tiny"
                color="gray400"
                lineHeight={1.08}
                margin={{ left: 6 }}
              >
                ({reviewsCount})
              </Text>
            </Container>
          ) : null}

          {salePrice !== undefined ? (
            <Pricing
              salePrice={salePrice}
              basePrice={
                !!basePrice && salePrice !== basePrice ? basePrice : undefined
              }
            />
          ) : null}

          {hasCoupon && (
            <Container margin={{ top: 4 }}>
              <Text
                bold
                inlineBlock
                size="tiny"
                color={hasOnlyExpectedApplicableCoupon ? 'mint' : 'gray700'}
              >
                쿠폰할인
              </Text>
              {displayDiscountPolicy ? (
                <Text
                  bold
                  inlineBlock
                  size="tiny"
                  color="mint"
                  margin={{ left: 5 }}
                >
                  {displayDiscountPolicy}
                </Text>
              ) : null}

              {hasOnlyExpectedApplicableCoupon ? (
                <Text
                  bold
                  inlineBlock
                  size="tiny"
                  color="gray700"
                  margin={{ left: 5 }}
                >
                  가능
                </Text>
              ) : null}
            </Container>
          )}
        </Container>
      </Container>
    </StaticIntersectionObserver>
  )
}

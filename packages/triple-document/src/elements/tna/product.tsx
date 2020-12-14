import React, { MouseEventHandler, useCallback } from 'react'
import {
  Text,
  Tag,
  Container,
  SquareImage,
  Image,
  Rating,
} from '@titicaca/core-elements'
import { formatNumber } from '@titicaca/view-utilities'
import IntersectionObserver from '@titicaca/intersection-observer'

import { TNAProductData } from './types'

interface TnaProductProps {
  index: number
  product: TNAProductData
  onClick: (
    e: React.SyntheticEvent,
    product: TNAProductData,
    index: number,
  ) => void
  onIntersect: (product: TNAProductData, index: number) => void
}

export function TnaProduct({
  index,
  product,
  product: { heroImage, title, tags, salePrice },
  onClick,
  onIntersect,
}: TnaProductProps) {
  const handleClick = useCallback(
    (e: React.SyntheticEvent) => onClick(e, product, index),
    [product, onClick, index],
  )

  const handleIntersectionChange = useCallback(
    ({ isIntersecting }: { isIntersecting: boolean }) => {
      if (isIntersecting) {
        onIntersect(product, index)
      }
    },
    [product, onIntersect, index],
  )

  return (
    <IntersectionObserver safe onChange={handleIntersectionChange}>
      <Container onClick={handleClick}>
        <SquareImage size="medium" floated="left" src={heroImage} alt={title} />
        <Text bold size="large" color="gray" margin={{ left: 150 }}>
          {title}
        </Text>

        {tags && tags.length > 0 && (
          <Container margin={{ top: 3, left: 150 }}>
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
        <Text bold size="large" color="gray" margin={{ top: 13, left: 150 }}>
          {`${formatNumber(salePrice)}원`}
        </Text>
      </Container>
    </IntersectionObserver>
  )
}

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
  product: { title, heroImage, tags, salePrice },
  index,
  onIntersect,
  onClick,
}: TnaProductProps) {
  // FIXME: 실제 값으로 대치
  const basePrice: number | undefined = 100000
  const reviewsCount: number | undefined = 14124
  const reviewsRating: number | undefined = 4.82

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
    <IntersectionObserver safe onChange={handleIntersectionChange}>
      <Container onClick={handleClick}>
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
          <Text bold size="large" color="gray">
            {title}
          </Text>

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

          {reviewsCount && reviewsRating ? (
            <Container margin={{ top: 4 }}>
              <Rating size="tiny" score={reviewsRating} />
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
              salePrice={
                typeof salePrice === 'string' ? parseInt(salePrice) : salePrice
              }
              basePrice={basePrice}
            />
          ) : null}
        </Container>
      </Container>
    </IntersectionObserver>
  )
}

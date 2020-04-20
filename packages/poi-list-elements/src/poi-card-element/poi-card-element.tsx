import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'
import { Container, Image, Text } from '@titicaca/core-elements'
import {
  ListingPOI,
  ImageMeta,
  TranslatedProperty,
} from '@titicaca/type-definitions'
import { Card, ReviewScrapStat } from '@titicaca/resource-list-element'
import { formatNumber } from '@titicaca/view-utilities'

import DirectionButton from './direction-button'
import ScrapButton from './scrap-button'

const IMAGE_PLACEHOLDERS = {
  hotel: 'https://assets.triple.guide/images/ico-blank-hotel@3x.png',
  attraction: 'https://assets.triple.guide/images/ico-blank-see@3x.png',
  restaurant: 'https://assets.triple.guide/images/ico-blank-eat@3x.png',
} as const

const DirectionButtonContainer = styled(Container)`
  line-height: 99px;
`

const ScrapButtonContainer = styled(Container).attrs({
  position: 'absolute',
})`
  top: 0;
  right: 0;
`

export default function POICardElement({
  type,
  names: { ko, en, local },
  regionId,
  image,
  comment,
  reviewsRating,
  reviewsCount,
  nightlyPrice,
  scraped,
  scrapsCount,
  distance,
  categoryName,
  areaName,
  onClick,
  onScrapedChange,
  onDirectionButtonClick,
  cardHeight,
  sideSpacing,
}: {
  type: ListingPOI['type']
  scraped: boolean
  regionId?: string
  image: ImageMeta
  names: TranslatedProperty
  comment?: string
  reviewsRating?: number
  reviewsCount?: number
  scrapsCount?: number
  nightlyPrice?: number
  distance?: string
  categoryName?: string
  areaName?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  onScrapedChange: Parameters<typeof ScrapButton>[0]['onScrapedChange']
  onDirectionButtonClick: Parameters<typeof DirectionButton>[0]['onClick']
  cardHeight: number
  sideSpacing: number
}) {
  return (
    <Card
      textAlign="left"
      padding={{ top: 18, right: 18, bottom: 18, left: 18 }}
      onClick={onClick}
      cardHeight={cardHeight}
      sideSpacing={sideSpacing}
    >
      <Container
        floated="left"
        clearing
        position="relative"
        margin={{ right: 14 }}
      >
        <Image
          size="small"
          width={58}
          height={72}
          asPlaceholder={!image}
          src={
            image
              ? 'smallSquare' in image.sizes
                ? image.sizes.smallSquare.url
                : image.sizes.small_square.url
              : IMAGE_PLACEHOLDERS[type]
          }
        />

        {regionId ? (
          <ScrapButtonContainer>
            <ScrapButton scraped={scraped} onScrapedChange={onScrapedChange} />
          </ScrapButtonContainer>
        ) : null}
      </Container>

      <Container floated="left" width={190}>
        <Text size="large" bold ellipsis>
          {ko || en || local}
        </Text>

        {comment ? (
          <Text alpha={0.7} size="small" margin={{ top: 4 }} maxLines={2}>
            {comment}
          </Text>
        ) : null}

        {categoryName || areaName ? (
          <Text size="tiny" alpha={0.4} margin={{ top: 4 }}>
            {[categoryName, areaName].filter((value) => value).join(' · ')}
          </Text>
        ) : null}

        <ReviewScrapStat
          reviewsCount={reviewsCount}
          scrapsCount={scrapsCount}
          reviewsRating={reviewsRating}
          margin={{ top: 4 }}
        />

        {distance || nightlyPrice !== undefined ? (
          <Container margin={{ top: 6 }}>
            {distance ? (
              <Text inlineBlock size="tiny" color="blue" margin={{ right: 4 }}>
                {distance} 이내
              </Text>
            ) : null}

            {nightlyPrice !== undefined ? (
              <Text inlineBlock size="small">
                {formatNumber(nightlyPrice)}원
              </Text>
            ) : null}
          </Container>
        ) : null}
      </Container>

      <DirectionButtonContainer floated="right">
        <DirectionButton onClick={onDirectionButtonClick} />
      </DirectionButtonContainer>
    </Card>
  )
}

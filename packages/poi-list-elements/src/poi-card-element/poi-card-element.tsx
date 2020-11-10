import React, { MouseEventHandler } from 'react'
import styled from 'styled-components'
import {
  Container,
  Text,
  Card as OriginalCard,
  Image,
} from '@titicaca/core-elements'
import {
  ListingPOI,
  ImageMeta,
  TranslatedProperty,
} from '@titicaca/type-definitions'
import {
  ReviewScrapStat,
  ResourceListElementStats,
} from '@titicaca/resource-list-element'
import { formatNumber } from '@titicaca/view-utilities'
import { OverlayScrapButton } from '@titicaca/scrap-button'

import DirectionButton, { DIRECTION_BUTTON_WIDTH } from './direction-button'

const IMAGE_WIDTH = 58

const IMAGE_PLACEHOLDERS = {
  hotel: 'https://assets.triple.guide/images/ico-blank-hotel@3x.png',
  attraction: 'https://assets.triple.guide/images/ico-blank-see@3x.png',
  restaurant: 'https://assets.triple.guide/images/ico-blank-eat@3x.png',
} as const

const Card = styled(OriginalCard)`
  background-color: white;
`

const POICardBody = styled(Container)`
  height: 100%;
`

const ImageContainer = styled(Container)`
  position: absolute;
  top: 0;
  left: 0;
`

const DirectionButtonContainer = styled(Container)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`

const ScrapButtonContainer = styled(Container).attrs({
  position: 'absolute',
})`
  top: 0;
  right: 0;
`

export default function POICardElement({
  id,
  type,
  names: { ko, en, local },
  regionId,
  image,
  comment,
  reviewsRating,
  reviewsCount,
  nightlyPrice,
  priceLabelOverride,
  scraped,
  scrapsCount,
  distance,
  categoryName,
  areaName,
  onClick,
  onDirectionButtonClick,
}: {
  id: string
  type: ListingPOI['type']
  scraped: boolean
  regionId?: string
  image: ImageMeta | undefined
  names: TranslatedProperty
  comment?: string
  reviewsRating?: number
  reviewsCount?: number
  /**
   * Scraps context를 통과하지 않은 POI의 원본 데이터를 넣어주세요.
   */
  scrapsCount?: number
  nightlyPrice?: number
  priceLabelOverride?: JSX.Element
  distance?: string
  categoryName?: string
  areaName?: string
  onClick?: MouseEventHandler<HTMLDivElement>
  onDirectionButtonClick: Parameters<typeof DirectionButton>[0]['onClick']
}) {
  return (
    <Card
      radius={6}
      shadowValue="0 1px 3px 0 rgba(0, 0, 0, 0.1)"
      padding={{ top: 18, right: 18, bottom: 18, left: 18 }}
    >
      <POICardBody
        position="relative"
        display="block"
        textAlign="left"
        onClick={onClick}
      >
        <ImageContainer clearing>
          <Image>
            <Image.FixedDimensionsFrame width={IMAGE_WIDTH} height={72}>
              {image ? (
                <Image.Img
                  src={
                    'smallSquare' in image.sizes
                      ? image.sizes.smallSquare.url
                      : image.sizes.small_square.url
                  }
                />
              ) : (
                <Image.Placeholder src={IMAGE_PLACEHOLDERS[type]} />
              )}
            </Image.FixedDimensionsFrame>
          </Image>

          {regionId ? (
            <ScrapButtonContainer>
              <OverlayScrapButton resource={{ id, type, scraped }} size={30} />
            </ScrapButtonContainer>
          ) : null}
        </ImageContainer>

        <Container
          maxWidth={190}
          margin={{
            left: IMAGE_WIDTH + 14,
            right: DIRECTION_BUTTON_WIDTH + 13,
          }}
        >
          <Text size="large" bold ellipsis>
            {ko || en || local}
          </Text>

          {comment ? (
            <Text alpha={0.7} size="small" margin={{ top: 4 }} maxLines={2}>
              {comment}
            </Text>
          ) : null}

          <ResourceListElementStats size="tiny" alpha={0.4} margin={{ top: 4 }}>
            <span>{categoryName}</span>
            <span>{areaName}</span>
          </ResourceListElementStats>

          <ReviewScrapStat
            id={id}
            scraped={!!scraped}
            reviewsCount={reviewsCount}
            scrapsCount={scrapsCount}
            reviewsRating={reviewsRating}
            margin={{ top: 4 }}
          />

          {distance ||
          nightlyPrice !== undefined ||
          priceLabelOverride !== undefined ? (
            <Container margin={{ top: 6 }}>
              {distance ? (
                <Text
                  inlineBlock
                  size="tiny"
                  color="blue"
                  margin={{ right: 4 }}
                >
                  {distance} 이내
                </Text>
              ) : null}

              {/* TODO: pricing과 관련 로직 통합 */}
              {priceLabelOverride ||
                (nightlyPrice !== undefined ? (
                  <Text inlineBlock size="small">
                    {formatNumber(nightlyPrice)}원
                  </Text>
                ) : null)}
            </Container>
          ) : null}
        </Container>

        <DirectionButtonContainer>
          <DirectionButton onClick={onDirectionButtonClick} />
        </DirectionButtonContainer>
      </POICardBody>
    </Card>
  )
}

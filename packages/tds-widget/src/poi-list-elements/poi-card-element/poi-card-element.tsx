import { MouseEventHandler } from 'react'
import { useTranslation } from '@titicaca/triple-web'
import { styled } from 'styled-components'
import { Container, Text, Card as OriginalCard, Image } from '@titicaca/tds-ui'
import { ImageMeta, TranslatedProperty } from '@titicaca/type-definitions'
import { formatNumber } from '@titicaca/view-utilities'

import { useScrap } from '../../scrap'
import { OverlayScrapButton } from '../../scrap-button'
import {
  ResourceListElementStats,
  ReviewScrapStat,
} from '../../resource-list-elements'
import type { PoiListElementType } from '../types'

import { DIRECTION_BUTTON_WIDTH, DirectionButton } from './direction-button'

const IMAGE_WIDTH = 58

const IMAGE_PLACEHOLDERS = {
  hotel: 'https://assets.triple.guide/images/ico_blank_hotel@3x.png',
  attraction: 'https://assets.triple.guide/images/ico_blank_see@3x.png',
  restaurant: 'https://assets.triple.guide/images/ico_blank_eat@3x.png',
} as const

const Card = styled(OriginalCard)`
  background-color: white;
`

const PoiCardBody = styled(Container)`
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

const ScrapButtonContainer = styled(Container)`
  position: absolute;
  top: 0;
  right: 0;
`

export function PoiCardElement({
  id,
  type,
  names: { ko, en, local },
  image,
  comment,
  reviewsRating,
  reviewsCount,
  nightlyPrice,
  priceLabelOverride,
  scraped,
  scrapsCount: rawScrapsCount,
  distance,
  categoryName,
  areaName,
  onClick,
  onDirectionButtonClick,
  optimized,
}: {
  id: string
  type: PoiListElementType['type']
  scraped: boolean
  /**
   * @deprecated 더이상 사용하지 않습니다.
   */
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
  optimized?: boolean
}) {
  const t = useTranslation()

  const formattedNightlyPrice = formatNumber(nightlyPrice)
  const { deriveCurrentStateAndCount } = useScrap()
  const { scrapsCount } = deriveCurrentStateAndCount({
    id,
    scraped,
    scrapsCount: rawScrapsCount,
  })

  return (
    <Card
      radius={6}
      shadowValue="0 1px 3px 0 rgba(0, 0, 0, 0.1)"
      css={{ padding: 18 }}
    >
      <PoiCardBody
        position="relative"
        display="block"
        onClick={onClick}
        css={{
          textAlign: 'left',
        }}
      >
        <ImageContainer clearing>
          <Image>
            <Image.FixedDimensionsFrame width={IMAGE_WIDTH} height={72}>
              {image ? (
                optimized ? (
                  <Image.OptimizedImg
                    cloudinaryId={image.cloudinaryId as string}
                    cloudinaryBucket={image.cloudinaryBucket}
                  />
                ) : (
                  <Image.Img
                    src={
                      'smallSquare' in image.sizes
                        ? image.sizes.smallSquare.url
                        : image.sizes.small_square.url
                    }
                  />
                )
              ) : (
                <Image.Placeholder src={IMAGE_PLACEHOLDERS[type]} />
              )}
            </Image.FixedDimensionsFrame>
          </Image>

          <ScrapButtonContainer>
            <OverlayScrapButton resource={{ id, type, scraped }} size={30} />
          </ScrapButtonContainer>
        </ImageContainer>

        <Container
          css={{
            maxWidth: 190,
            marginLeft: IMAGE_WIDTH + 14,
            marginRight: DIRECTION_BUTTON_WIDTH + 13,
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

          <ResourceListElementStats
            stats={[categoryName, areaName]}
            size="tiny"
            alpha={0.4}
            margin={{ top: 4 }}
          />

          <ReviewScrapStat
            reviewsCount={reviewsCount}
            scrapsCount={scrapsCount}
            reviewsRating={reviewsRating}
            css={{ marginTop: 4 }}
          />

          {distance ||
          nightlyPrice !== undefined ||
          priceLabelOverride !== undefined ? (
            <Container
              css={{
                margin: '6px 0 0',
              }}
            >
              {distance ? (
                <Text
                  inlineBlock
                  size="tiny"
                  color="blue"
                  margin={{ right: 4 }}
                >
                  {t('{{distance}} 이내', { distance })}
                </Text>
              ) : null}

              {/* TODO: pricing과 관련 로직 통합 */}
              {priceLabelOverride ||
                (nightlyPrice !== undefined ? (
                  <Text inlineBlock size="small">
                    {t('{{formattedNightlyPrice}}원', {
                      formattedNightlyPrice,
                    })}
                  </Text>
                ) : null)}
            </Container>
          ) : null}
        </Container>

        <DirectionButtonContainer>
          <DirectionButton onClick={onDirectionButtonClick} />
        </DirectionButtonContainer>
      </PoiCardBody>
    </Card>
  )
}

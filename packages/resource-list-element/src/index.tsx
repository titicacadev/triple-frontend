import * as React from 'react'
import styled from 'styled-components'
import ScrapButton, { ScrapButtonProps } from '@titicaca/scrap-button'
import { formatNumber } from '@titicaca/view-utilities'
import {
  Container,
  Label,
  LabelColor,
  Text,
  Rating,
  Image,
  List,
} from '@titicaca/core-elements'
import Pricing, { BasePrice } from '@titicaca/pricing'
import { ImageMeta } from '@titicaca/type-definitions'

export type ResourceListElementProps<R = {}> = Partial<
  Pick<ScrapButtonProps<R>, 'scraped' | 'resource' | 'onScrapedChange'>
> & {
  hideScrapButton?: boolean
  image?: ImageMeta
  imagePlaceholder?: string
  name?: string
  comment?: string
  distance?: number | string
  distanceSuffix?: string
  note?: string
  tags?: {
    text?: string
    color?: LabelColor
    emphasized?: boolean
  }[]
  basePrice?: BasePrice
  salePrice?: number
  pricingNote?: string
  pricingDescription?: React.ReactNode
  priceLabelOverride?: string
  isSoldOut?: boolean
  hideDiscountRate?: boolean
  scrapsCount?: number
  reviewsCount?: number
  reviewsRating?: number
  maxCommentLines?: number
  onClick?: React.MouseEventHandler<HTMLLIElement>
} & Partial<Parameters<typeof List.Item>['0']>

const ResourceListItem = styled(List.Item)`
  position: relative;
  min-height: 150px;
  padding: 20px 0;
  box-sizing: border-box;
  cursor: pointer;
`

const ContentContainer = styled.div`
  position: absolute;
  top: 20px;
  width: calc(100% - 110px);
`

const LabelContainer = styled.div`
  position: absolute;
  bottom: 0;
`

export default function ExtendedResourceListElement<R>({
  hideScrapButton,
  resource,
  scraped,
  onScrapedChange,
  image,
  imagePlaceholder,
  name,
  comment,
  distance,
  distanceSuffix = 'm',
  note,
  tags,
  basePrice,
  salePrice,
  pricingNote,
  pricingDescription,
  priceLabelOverride,
  isSoldOut,
  hideDiscountRate,
  scrapsCount,
  reviewsCount,
  reviewsRating,
  onClick,
  maxCommentLines,
  ...props
}: ResourceListElementProps<R>) {
  const labels = tags || []

  return (
    <ResourceListItem onClick={onClick} {...props}>
      <Container position="relative">
        <Container clearing>
          <Image
            floated="right"
            size="small"
            width={90}
            src={
              image
                ? ('small_square' in image.sizes
                    ? image.sizes.small_square
                    : image.sizes.smallSquare
                  ).url
                : imagePlaceholder
            }
            asPlaceholder={!image}
            alt={name}
          />

          {!hideScrapButton && scraped !== undefined && onScrapedChange ? (
            <ScrapButton
              scraped={scraped}
              resource={resource}
              onScrapedChange={onScrapedChange}
            />
          ) : null}
        </Container>

        {salePrice || priceLabelOverride ? (
          <Container margin={{ top: 18 }}>
            <Pricing
              rich
              basePrice={basePrice}
              basePriceUnit="원"
              salePrice={salePrice}
              pricingNote={pricingNote}
              description={pricingDescription}
              priceLabelOverride={priceLabelOverride}
              hideDiscountRate={hideDiscountRate}
              isSoldOut={isSoldOut}
            />
          </Container>
        ) : null}

        {labels.length > 0 ? (
          <LabelContainer>
            <Label.Group horizontalGap={5}>
              {labels.map(({ text, color, emphasized }, index) => (
                <Label key={index} promo color={color} emphasized={emphasized}>
                  {text}
                </Label>
              ))}
            </Label.Group>
          </LabelContainer>
        ) : null}
      </Container>

      <ContentContainer>
        <Text bold maxLines={2} size="large">
          {name}
        </Text>

        <Text
          alpha={0.7}
          maxLines={maxCommentLines}
          size="small"
          margin={{ top: 5 }}
        >
          {comment}
        </Text>

        {reviewsCount || scrapsCount ? (
          <Container margin={{ top: 5 }}>
            <>
              {reviewsCount ? (
                <Rating
                  verticalAlign="middle"
                  size="tiny"
                  score={reviewsRating}
                />
              ) : null}

              <Text inline size="tiny" alpha={0.4}>
                {[
                  reviewsCount ? ` (${formatNumber(reviewsCount)})` : null,
                  scrapsCount ? `저장 ${formatNumber(scrapsCount)}` : null,
                ]
                  .filter((count) => count)
                  .join(' · ')}
              </Text>
            </>
          </Container>
        ) : null}

        {distance || distance === 0 || note ? (
          <Container margin={{ top: 3 }}>
            {distance || distance === 0 ? (
              <Text inline color="blue" size="small" alpha={1}>
                {`${distance}${distanceSuffix} `}
              </Text>
            ) : null}
            {note ? (
              <Text inline size="small" alpha={0.4}>
                {note}
              </Text>
            ) : null}
          </Container>
        ) : null}
      </ContentContainer>
    </ResourceListItem>
  )
}

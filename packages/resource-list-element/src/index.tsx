import * as React from 'react'
import styled from 'styled-components'
import ScrapButton from '@titicaca/scrap-button'
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
import Pricing from '@titicaca/pricing'

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

export default function ExtendedResourceListElement({
  resource,
  image,
  imagePlaceholder,
  name,
  comment,
  distance,
  note,
  tags,
  basePrice,
  salePrice,
  pricingNote,
  pricingDescription,
  scraped,
  scrapsCount,
  reviewsCount,
  reviewsRating,
  onClick,
  onScrapedChange,
  hideScrapButton,
}: {
  resource?: any
  image?: any
  imagePlaceholder?: string
  name?: string
  comment?: string
  distance?: number
  note?: string
  tags?: [{ text?: string; color?: LabelColor; emphasized?: boolean }]
  basePrice?: number
  salePrice?: number
  pricingNote?: string
  pricingDescription?: React.ReactNode
  scraped?: any
  scrapsCount?: number
  reviewsCount?: number
  reviewsRating?: number
  onClick?: (e?: React.SyntheticEvent) => any
  onScrapedChange?: (e?: React.SyntheticEvent, value?: any) => any
  hideScrapButton?: boolean
}) {
  return (
    <ResourceListItem onClick={onClick}>
      <Container>
        <Container clearing>
          <Image
            floated="right"
            size="small"
            width={90}
            src={
              image
                ? (image.sizes.smallSquare || image.sizes.small_square).url
                : imagePlaceholder
            }
            asPlaceholder={!image}
            alt={name}
          />

          {!hideScrapButton ? (
            <ScrapButton
              top={23}
              scraped={scraped}
              resource={resource}
              onScrapedChange={onScrapedChange}
            />
          ) : null}
        </Container>

        {salePrice ? (
          <Container margin={{ top: 20 }}>
            <Pricing
              rich
              basePrice={basePrice}
              salePrice={salePrice}
              pricingNote={pricingNote}
              description={pricingDescription}
            />
          </Container>
        ) : null}
      </Container>

      <ContentContainer>
        <Text bold maxLines={2} size="large">
          {name}
        </Text>

        <Text alpha={0.7} size="small" margin={{ top: 5 }}>
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
                {`${distance}m `}
              </Text>
            ) : null}
            {note ? (
              <Text inline size="small" alpha={0.4}>
                {note}
              </Text>
            ) : null}
          </Container>
        ) : null}

        {(tags || []).length > 0 ? (
          <Label.Group margin={{ top: 12 }} horizontalGap={5}>
            {tags.map(
              (
                {
                  text,
                  color,
                  emphasized,
                }: { text: string; color: LabelColor; emphasized: boolean },
                index,
              ) => (
                <Label key={index} promo color={color} emphasized={emphasized}>
                  {text}
                </Label>
              ),
            )}
          </Label.Group>
        ) : null}
      </ContentContainer>
    </ResourceListItem>
  )
}

import * as React from 'react'
import styled from 'styled-components'
import Container from '../../elements/container'
import Label, { labelColor } from '../../elements/label'
import Text from '../../elements/text'
import Rating from '../../elements/rating'
import Image from '../../elements/image'
import List from '../../elements/list'
import ScrapButton from '../../elements/scrap-button'
import Pricing from '../../elements/pricing'
import { formatNumber } from '../../utilities'

const ResourceListItem = styled(List.Item)`
  min-height: 150px;
  padding: 20px 0;
  box-sizing: border-box;
`

export function ExtendedResourceListElement({
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
  scraped,
  scrapsCount,
  reviewsCount,
  reviewsRating,
  onClick,
  onScrapedChange,
}: {
  resource?: any
  image?: any
  imagePlaceholder?: string
  name?: string
  comment?: string
  distance?: number
  note?: string
  tags?: [{ text?: string; color?: labelColor; emphasized?: boolean }]
  basePrice?: number
  salePrice?: number
  pricingNote?: string
  scraped?: any
  scrapsCount?: number
  reviewsCount?: number
  reviewsRating?: number
  onClick?: (e?: React.SyntheticEvent) => any
  onScrapedChange?: (e?: React.SyntheticEvent, value?: any) => any
}) {
  return (
    <ResourceListItem onClick={onClick}>
      <Image
        floated="right"
        size="small"
        width={90}
        src={image ? image.sizes.large.url : imagePlaceholder}
        asPlaceholder={!image}
        margin={{ left: 20 }}
      />

      <Text bold maxLines={2} size="large">
        {name}
      </Text>

      <Text alpha={0.7} size="small" margin={{ top: 5 }}>
        {comment}
      </Text>

      {reviewsCount || scrapsCount ? (
        <Container margin={{ top: 4 }}>
          <>
            {reviewsCount ? <Rating size="tiny" score={reviewsRating} /> : null}
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
              }: { text: string; color: labelColor; emphasized: boolean },
              index,
            ) => (
              <Label key={index} promo color={color} emphasized={emphasized}>
                {text}
              </Label>
            ),
          )}
        </Label.Group>
      ) : null}

      <ScrapButton
        top={23}
        scraped={scraped}
        resource={resource}
        onScrapedChange={onScrapedChange}
      />

      {salePrice ? (
        <>
          <Pricing basePrice={basePrice} salePrice={salePrice} />
          {pricingNote ? (
            <Container textAlign="right">
              <Text size="mini" color="gray" alpha={0.5} margin={{ top: 2 }}>
                {pricingNote}
              </Text>
            </Container>
          ) : null}
        </>
      ) : null}
    </ResourceListItem>
  )
}

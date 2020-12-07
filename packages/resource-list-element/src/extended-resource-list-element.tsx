import React from 'react'
import styled from 'styled-components'
import { OverlayScrapButton } from '@titicaca/scrap-button'
import {
  Container,
  Label,
  LabelColor,
  Text,
  List,
  Image,
} from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'

import ReviewScrapStat from './review-scrap-stat'

type ResourceMeta = {
  id: string
  type?: string
  scraped?: boolean
}

export type ResourceListElementProps<R extends ResourceMeta> = {
  /** @deprecated */
  resource?: R
  scrapResource?: R
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
  scrapsCount?: number
  reviewsCount?: number
  reviewsRating?: number
  maxCommentLines?: number
  isAdvertisement?: boolean
  partnerName?: string
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

export default function ExtendedResourceListElement<R extends ResourceMeta>({
  resource,
  scrapResource,
  hideScrapButton,
  image,
  imagePlaceholder,
  name,
  comment,
  distance,
  distanceSuffix = 'm',
  note,
  tags,
  scrapsCount,
  reviewsCount,
  reviewsRating,
  onClick,
  maxCommentLines,
  isAdvertisement,
  partnerName,
  children,
  ...props
}: React.PropsWithChildren<ResourceListElementProps<R>>) {
  const { id, type, scraped } = scrapResource || resource || {}
  const labels = tags || []

  return (
    <ResourceListItem onClick={onClick} {...props}>
      <Container position="relative">
        <Container clearing>
          <Image>
            <Image.FixedDimensionsFrame size="small" width={90} floated="right">
              {image ? (
                <Image.Img
                  src={
                    ('small_square' in image.sizes
                      ? image.sizes.small_square
                      : image.sizes.smallSquare
                    ).url
                  }
                  alt={name}
                />
              ) : (
                <Image.Placeholder src={imagePlaceholder || ''} />
              )}
            </Image.FixedDimensionsFrame>
          </Image>

          {!hideScrapButton && id && type ? (
            <Container position="absolute" positioning={{ top: 3, right: 3 }}>
              <OverlayScrapButton resource={{ id, type, scraped }} size={36} />
            </Container>
          ) : null}
        </Container>

        {children}

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

        <ReviewScrapStat
          reviewsCount={reviewsCount}
          scrapsCount={scrapsCount}
          reviewsRating={reviewsRating}
          margin={{ top: 5 }}
        />

        {partnerName ? (
          <Text size="tiny" color="gray" alpha={0.5} margin={{ top: 5 }}>
            {partnerName}
          </Text>
        ) : null}

        {distance || distance === 0 || note || isAdvertisement ? (
          <Container margin={{ top: 3 }}>
            {isAdvertisement ? (
              <Label
                emphasized
                size="tiny"
                promo
                color="white"
                margin={{ right: 5 }}
                verticalAlign="middle"
              >
                광고
              </Label>
            ) : null}
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

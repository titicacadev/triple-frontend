import { MouseEventHandler, PropsWithChildren } from 'react'
import { useTranslation } from '@titicaca/next-i18next'
import styled, { css, WebTarget } from 'styled-components'
import { OverlayScrapButton } from '@titicaca/scrap-button'
import {
  Container,
  Label,
  LabelColor,
  Text,
  List,
  ListItemProps,
  Image,
  FlexBox,
} from '@titicaca/core-elements'
import { ImageMeta } from '@titicaca/type-definitions'

import ReviewScrapStat from './review-scrap-stat'

interface ResourceMeta {
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
  badge?: {
    text: string
    icon?: string
  }
  scrapsCount?: number
  reviewsCount?: number
  reviewsRating?: number
  maxCommentLines?: number
  isAdvertisement?: boolean
  partnerName?: string
  areaName?: string
  onClick?: MouseEventHandler<HTMLLIElement>
  optimized?: boolean
  as?: WebTarget
} & ListItemProps

const ResourceListItem = styled(List.Item)`
  position: relative;
  padding: 20px 0;
  cursor: pointer;
`

const LabelContainer = styled.div`
  position: absolute;
  bottom: 20px;
`

const Badge = styled.div<{ icon?: string }>`
  padding: 0 6px 0 ${({ icon }) => (icon ? 4 : 6)}px;
  border-radius: 4px;
  box-shadow: 0 0 0 1px var(--color-gray100) inset;
  display: inline-block;

  ${({ icon }) =>
    icon &&
    css`
      &::before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-image: url(${icon});
        background-size: 12px;
        background-position: center;
        background-repeat: no-repeat;
        vertical-align: middle;
      }
    `};
`

function ExtendedResourceListElement<R extends ResourceMeta>({
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
  badge,
  scrapsCount,
  reviewsCount,
  reviewsRating,
  onClick,
  maxCommentLines,
  isAdvertisement,
  partnerName,
  areaName,
  children,
  optimized,
  ...props
}: PropsWithChildren<ResourceListElementProps<R>>) {
  const { t } = useTranslation('common-web')

  const { id, type, scraped } = scrapResource || resource || {}
  const labels = tags || []
  const formattedNames = [partnerName, areaName].filter(Boolean).join(' · ')

  return (
    <ResourceListItem onClick={onClick} {...props}>
      <FlexBox flex justifyContent="space-between" gap="16px">
        <Container css={{ width: '100%' }}>
          <FlexBox
            flex
            alignItems="flex-start"
            justifyContent="space-between"
            gap="7px"
          >
            <Text bold maxLines={2} size="large">
              {name}
            </Text>

            {isAdvertisement ? (
              <Text
                size={10}
                lineHeight="12px"
                color="gray400"
                css={{
                  minWidth: '24px',
                  border: '1px solid var(--color-gray200)',
                  borderRadius: '4px',
                  padding: '1px 2px',
                }}
              >
                {t(['gwanggo', '광고'])}
              </Text>
            ) : null}
          </FlexBox>

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
            css={{ marginTop: 5 }}
          />

          {formattedNames ? (
            <Container
              css={{
                margin: '5px 0 0',
              }}
            >
              <Text inlineBlock size="tiny" color="gray" alpha={0.5}>
                {formattedNames}
              </Text>
            </Container>
          ) : null}

          {distance || distance === 0 || note || isAdvertisement ? (
            <Container
              css={{
                margin: '3px 0 0',
              }}
            >
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

          {badge ? (
            <Container css={{ margin: '7px 0 0' }}>
              <Badge icon={badge.icon}>
                <Text bold inline size={11} lineHeight="23px" color="gray900">
                  {badge.text}
                </Text>
              </Badge>
            </Container>
          ) : null}
        </Container>

        <Container position="relative">
          <Container clearing>
            <Image>
              <Image.FixedDimensionsFrame size="small" width={90}>
                {image ? (
                  optimized ? (
                    <Image.OptimizedImg
                      cloudinaryId={image.cloudinaryId as string}
                      cloudinaryBucket={image.cloudinaryBucket}
                      alt={name}
                    />
                  ) : (
                    <Image.Img
                      src={
                        ('small_square' in image.sizes
                          ? image.sizes.small_square
                          : image.sizes.smallSquare
                        ).url
                      }
                      alt={name}
                    />
                  )
                ) : (
                  <Image.Placeholder src={imagePlaceholder || ''} />
                )}
              </Image.FixedDimensionsFrame>
            </Image>

            {!hideScrapButton && id && type ? (
              <Container
                position="absolute"
                css={{
                  top: '3px',
                  right: '3px',
                }}
              >
                <OverlayScrapButton
                  resource={{ id, type, scraped }}
                  size={36}
                />
              </Container>
            ) : null}
          </Container>
        </Container>
      </FlexBox>
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
    </ResourceListItem>
  )
}

export default ExtendedResourceListElement

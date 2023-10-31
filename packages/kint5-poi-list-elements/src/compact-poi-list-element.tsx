import { useState, useRef, useEffect } from 'react'
import {
  Text,
  SquareImage,
  Container,
  FlexBox,
  List,
} from '@titicaca/kint5-core-elements'
import { OutlineScrapButton } from '@titicaca/scrap-button'

import {
  PoiListElementBaseProps,
  ActionButtonElement,
  PoiListElementType,
} from './types'
import { getTypeNames } from './get-type-names'

interface CompactPoiListElementBaseProps<T extends PoiListElementType>
  extends PoiListElementBaseProps<T> {
  actionButtonElement?: ActionButtonElement
}

export type CompactPoiListElementProps<T extends PoiListElementType> =
  CompactPoiListElementBaseProps<T> &
    Partial<Pick<Parameters<typeof Container>['0'], 'as'>>

const POI_IMAGE_PLACEHOLDERS_SMALL: {
  [key in PoiListElementType['type']]: string
} = {
  attraction: 'https://assets.triple.guide/images/ico_blank_see_small@2x.png',
  restaurant: 'https://assets.triple.guide/images/ico_blank_eat_small@2x.png',
  hotel: 'https://assets.triple.guide/images/ico_blank_hotel_small@2x.png',
}

export function CompactPoiListElement<T extends PoiListElementType>({
  actionButtonElement,
  poi,
  poi: {
    type,
    nameOverride,
    region,
    source: { names, image, areas, vicinity },
  },
  onClick,
}: CompactPoiListElementProps<T>) {
  const [actionButtonWidth, setActionButtonWidth] = useState(0)
  const actionButtonRef = useRef<HTMLDivElement & { width?: number }>(null)

  useEffect(() => {
    if (actionButtonRef && actionButtonRef.current) {
      setActionButtonWidth(actionButtonRef.current?.width || 0)
    }
  }, [actionButtonRef])

  const { names: regionNames } = region?.source || {}

  const name = nameOverride || names.primary || names.en || names.local
  const regionName =
    regionNames?.primary || regionNames?.en || regionNames?.local

  return (
    <List.Item
      onClick={onClick}
      css={{
        display: 'flex',
        gap: 12,
        ':not(:last-child)': { marginBottom: 20 },
      }}
    >
      <SquareImage
        size="small"
        src={image ? image.sizes.large.url : POI_IMAGE_PLACEHOLDERS_SMALL[type]}
        alt={name || ''}
        borderRadius={12}
      />
      <FlexBox
        flex
        css={{
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        <Text
          ellipsis
          css={{
            fontSize: 14,
            fontWeight: 700,
            marginRight: actionButtonWidth,
          }}
        >
          {name}
        </Text>
        <Text
          css={{
            fontSize: 13,
            fontWeight: 400,
            color: 'var(--color-kint5-gray60)',
          }}
        >
          {[
            getTypeNames(type),
            regionName
              ? areas?.[0]?.name
                ? `${regionName}(${areas?.[0]?.name})`
                : regionName
              : areas?.[0]?.name || vicinity,
          ]
            .filter(Boolean)
            .join(' · ')}
        </Text>
      </FlexBox>
      {actionButtonElement ? (
        <div ref={actionButtonRef}>{actionButtonElement}</div>
      ) : (
        <Container
          position="absolute"
          css={{
            top: 0,
            right: 0,
          }}
        >
          <OutlineScrapButton resource={poi} size={34} />
        </Container>
      )}
    </List.Item>
  )
}

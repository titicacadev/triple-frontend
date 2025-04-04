import { useState, useRef, useEffect } from 'react'
import {
  Text,
  SquareImage,
  ResourceListItem,
  Container,
} from '@titicaca/tds-ui'
import { GuestModeType } from '@titicaca/type-definitions'
import { useTranslation } from '@titicaca/triple-web'
import { WebTarget } from 'styled-components'

import { OutlineScrapButton } from '../scrap-button'

import {
  PoiListElementBaseProps,
  ActionButtonElement,
  PoiListElementType,
} from './types'
import { getTypeNames } from './get-type-names'

interface CompactPoiListElementBaseProps<T extends PoiListElementType>
  extends PoiListElementBaseProps<T> {
  actionButtonElement?: ActionButtonElement
  guestMode?: GuestModeType
}

export type CompactPoiListElementProps<T extends PoiListElementType> =
  CompactPoiListElementBaseProps<T> & {
    as?: WebTarget
  }

const POI_IMAGE_PLACEHOLDERS_SMALL: {
  [key in PoiListElementType['type']]: string
} = {
  attraction: 'https://assets.triple.guide/images/ico_blank_see_small@2x.png',
  restaurant: 'https://assets.triple.guide/images/ico_blank_eat_small@2x.png',
  hotel: 'https://assets.triple.guide/images/ico_blank_hotel_small@2x.png',
}

export function CompactPoiListElement<T extends PoiListElementType>({
  as,
  actionButtonElement,
  poi,
  poi: {
    type,
    nameOverride,
    region,
    source: { names, image, areas, vicinity },
  },
  onClick,
  guestMode,
}: CompactPoiListElementProps<T>) {
  const t = useTranslation()
  const [actionButtonWidth, setActionButtonWidth] = useState(0)
  const actionButtonRef = useRef<HTMLDivElement & { width?: number }>(null)

  useEffect(() => {
    if (actionButtonRef && actionButtonRef.current) {
      setActionButtonWidth(actionButtonRef.current?.width || 0)
    }
  }, [actionButtonRef])

  const { names: regionNames } = region?.source || {}

  const name =
    nameOverride || names.primary || names.ko || names.en || names.local
  const regionName =
    regionNames?.primary ||
    regionNames?.ko ||
    regionNames?.en ||
    regionNames?.local
  const ActionButton = actionButtonElement ? (
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
  )

  return (
    <ResourceListItem as={as} onClick={onClick}>
      <SquareImage
        floated="left"
        size="small"
        src={image ? image.sizes.large.url : POI_IMAGE_PLACEHOLDERS_SMALL[type]}
        alt={name || ''}
      />
      <Text
        bold
        ellipsis
        alpha={1}
        margin={{ left: 50, right: actionButtonWidth }}
        padding={{ right: 40 }}
      >
        {name}
      </Text>
      <Text size="tiny" alpha={0.7} margin={{ top: 4, left: 50 }}>
        {[
          t(getTypeNames(type)),
          regionName
            ? areas?.[0]?.name
              ? `${regionName}(${areas?.[0]?.name})`
              : regionName
            : areas?.[0]?.name || vicinity,
        ]
          .filter(Boolean)
          .join(' · ')}
      </Text>

      {!guestMode ? ActionButton : null}
    </ResourceListItem>
  )
}

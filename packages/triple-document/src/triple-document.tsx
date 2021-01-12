import React, { useMemo, useCallback } from 'react'
import {
  HR1,
  HR2,
  HR3,
  HR4,
  HR5,
  HR6,
  ImageSourceType,
} from '@titicaca/core-elements'
import { useHistoryFunctions } from '@titicaca/react-contexts'
import { initialize } from '@titicaca/standard-action-handler'

import {
  Coupon,
  Text,
  MH1,
  MH2,
  MH3,
  MH4,
  Embedded,
  ExternalVideo,
  Images,
  Links,
  List,
  Note,
  Pois,
  Regions,
  Table,
  TnaProductsList,
} from './elements'
import {
  TripleElementData,
  ImageEventHandler,
  LinkEventHandler,
  ElementSet,
} from './types'

interface TripleDocumentProps {
  customElements?: ElementSet
  children: TripleElementData[]

  // merged...
  onResourceClick?: (e: React.SyntheticEvent, resource: unknown) => void
  onImageClick?: ImageEventHandler
  onLinkClick?: LinkEventHandler
  onTNAProductClick?: (
    e: React.SyntheticEvent,
    product: unknown,
    slotId?: number,
    index?: number,
  ) => void
  onTNAProductsFetch?: (slotId: number) => Promise<unknown>
  imageSourceComponent?: ImageSourceType
  deepLink?: string
  cta?: string
  videoAutoPlay?: boolean
  hideVideoControls?: boolean
  optimized?: boolean
}

export const ELEMENTS: ElementSet = {
  heading1: MH1,
  heading2: MH2,
  heading3: MH3,
  heading4: MH4,
  text: Text,
  images: Images,
  hr1: HR1,
  hr2: HR2,
  hr3: HR3,
  hr4: HR4,
  hr5: HR5,
  hr6: HR6,
  pois: Pois,
  links: Links,
  embedded: Embedded,
  note: Note,
  list: List,
  regions: Regions,
  video: ExternalVideo,
  tnaProducts: TnaProductsList,
  table: Table,
  coupon: Coupon,
}

export function TripleDocument({
  children,
  customElements = {},
  onResourceClick,
  onImageClick,
  onLinkClick,
  onTNAProductClick,
  onTNAProductsFetch,
  imageSourceComponent,
  deepLink,
  cta,
  videoAutoPlay,
  hideVideoControls,
  optimized = false,
}: TripleDocumentProps) {
  const { navigate } = useHistoryFunctions()
  const handleAction = useMemo(() => initialize({ cta, navigate }), [
    cta,
    navigate,
  ])

  const defaultHandleLinkClick = useCallback(
    (e: React.SyntheticEvent, { href, target }) => {
      handleAction(href, { target })
    },
    [handleAction],
  )

  const defaultHandleResourceClick = useCallback(
    (e: React.SyntheticEvent, resource) => {
      const url = composeResourceUrl(resource)

      url && handleAction(url)
    },
    [handleAction],
  )

  return (
    <>
      {children.map(({ type, value }, i) => {
        const Element = { ...ELEMENTS, ...customElements }[type]

        return (
          Element && (
            <Element
              key={i}
              value={value}
              onResourceClick={onResourceClick || defaultHandleResourceClick}
              onImageClick={onImageClick}
              onLinkClick={onLinkClick || defaultHandleLinkClick}
              onTNAProductClick={onTNAProductClick}
              onTNAProductsFetch={onTNAProductsFetch}
              ImageSource={imageSourceComponent}
              deepLink={deepLink}
              videoAutoPlay={videoAutoPlay}
              hideVideoControls={hideVideoControls}
              optimized={optimized}
            />
          )
        )
      })}
    </>
  )
}

function composeResourceUrl(resource: {
  id: string
  type: string
  source: unknown
}) {
  switch (resource.type) {
    case 'attraction':
      return `/inlink?path=${encodeURIComponent(
        `/attractions/${resource.id}?_triple_no_navbar`,
      )}`
    case 'restaurant':
      return `/inlink?path=${encodeURIComponent(
        `/restaurants/${resource.id}?_triple_no_navbar`,
      )}`
    case 'hotel':
      return `/inlink?path=${encodeURIComponent(
        `/hotels/${resource.id}?_triple_no_navbar`,
      )}`
    case 'article':
      return `/inlink?path=${encodeURIComponent(
        `/articles/${resource.id}?_triple_no_navbar`,
      )}`
    case 'region':
      return `/regions/${resource.id}`
    default:
      return null
  }
}

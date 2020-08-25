import React, { useCallback } from 'react'
import { List } from '@titicaca/core-elements'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'
import { PoiListElement } from '@titicaca/poi-list-elements'
import {
  useEventTrackingContext,
  useHistoryFunctions,
} from '@titicaca/react-contexts'

import { ListingPOI } from './types'

export default function PoiEntry({
  index,
  poi,
  eventLabel,
  scraps,
  onScrapedChange,
}: {
  index: number
  poi: ListingPOI
  eventLabel: string
  scraps: { [key: string]: boolean }
  onScrapedChange: (props: {
    id: string
    type: string
    scraped: boolean
  }) => void
}) {
  const { trackEvent, trackSimpleEvent } = useEventTrackingContext()
  const { navigate } = useHistoryFunctions()

  const handleIntersectionChange = useCallback(
    ({ isIntersecting }: { isIntersecting: boolean }) => {
      if (isIntersecting) {
        trackEvent({
          fa: {
            action: '근처추천장소_POI노출',
            label: `${eventLabel}_${index + 1}_${poi.id}`,
            /* eslint-disable-next-line @typescript-eslint/camelcase */
            item_id: poi.id,
          },
        })
      }
    },
    [trackEvent, poi, eventLabel, index],
  )

  const handleScrapedChange = useCallback(
    (
      e?: React.SyntheticEvent,
      params?: { id: string; type: string; scraped: boolean },
    ) => {
      if (params) {
        onScrapedChange(params)
      }
    },
    [onScrapedChange],
  )

  const handleClick = useCallback(() => {
    trackSimpleEvent({
      action: '근처추천장소_POI선택',
      label: `${eventLabel}_${index + 1}_${poi.id}`,
    })

    navigate(`/regions/${poi.source.regionId}/${poi.type}s/${poi.id}`)
  }, [navigate, poi, trackSimpleEvent, eventLabel, index])

  return (
    <IntersectionObserver key={poi.id} onChange={handleIntersectionChange}>
      <List.Item>
        <PoiListElement
          as="div"
          poi={poi}
          onScrapedChange={handleScrapedChange}
          resourceScraps={scraps}
          onClick={handleClick}
        />
      </List.Item>
    </IntersectionObserver>
  )
}

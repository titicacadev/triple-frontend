import React, { useCallback } from 'react'
import IntersectionObserver from '@titicaca/intersection-observer'
import { PoiListElement, POI } from '@titicaca/poi-list-elements'
import {
  useHistoryContext,
  useEventTrackingContext,
} from '@titicaca/react-contexts'

export default function PoiEntry({
  index,
  poi,
  eventLabel,
  scraps,
  onScrapedChange,
}: {
  index: number
  poi: POI
  eventLabel: string
  scraps: { [key: string]: boolean }
  onScrapedChange: (props: {
    id: string
    type: string
    scraped: boolean
  }) => void
}) {
  const { trackEvent, trackSimpleEvent } = useEventTrackingContext()
  const { navigate } = useHistoryContext()

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
    <IntersectionObserver safe key={poi.id} onChange={handleIntersectionChange}>
      <div>
        <PoiListElement
          poi={poi}
          onScrapedChange={handleScrapedChange}
          resourceScraps={scraps}
          onClick={handleClick}
        />
      </div>
    </IntersectionObserver>
  )
}

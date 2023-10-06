import { useCallback } from 'react'
import { List } from '@titicaca/core-elements'
import { StaticIntersectionObserver as IntersectionObserver } from '@titicaca/intersection-observer'
import { PoiListElement } from '@titicaca/poi-list-elements'
import { useEventTrackingContext } from '@titicaca/react-contexts'
import { useNavigate } from '@titicaca/router'

import { ListingPoi } from './types'

export default function PoiEntry({
  index,
  poi,
  poi: {
    id,
    type,
    source: { regionId },
  },
  eventLabel,
  optimized,
}: {
  index: number
  poi: ListingPoi
  eventLabel: string
  optimized?: boolean
}) {
  const { trackEvent, trackSimpleEvent } = useEventTrackingContext()
  const navigate = useNavigate()

  const handleIntersectionChange = useCallback(
    ({ isIntersecting }: { isIntersecting: boolean }) => {
      if (isIntersecting) {
        trackEvent({
          fa: {
            action: '근처추천장소_POI노출',
            label: `${eventLabel}_${index + 1}_${id}`,
            item_id: id,
          },
        })
      }
    },
    [trackEvent, eventLabel, index, id],
  )

  const handleClick = useCallback(() => {
    trackSimpleEvent({
      action: '근처추천장소_POI선택',
      label: `${eventLabel}_${index + 1}_${id}`,
    })

    navigate(
      regionId ? `/regions/${regionId}/${type}s/${id}` : `/${type}s/${id}`,
    )
  }, [eventLabel, id, index, navigate, regionId, trackSimpleEvent, type])

  return (
    <IntersectionObserver key={id} onChange={handleIntersectionChange}>
      <List.Item>
        <PoiListElement
          as="div"
          poi={poi}
          onClick={handleClick}
          optimized={optimized}
        />
      </List.Item>
    </IntersectionObserver>
  )
}

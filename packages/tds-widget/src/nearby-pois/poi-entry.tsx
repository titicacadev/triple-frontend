import { useCallback } from 'react'
import { List } from '@titicaca/tds-ui'
import { InView } from 'react-intersection-observer'
import { useTrackEvent } from '@titicaca/triple-web'
import { useNavigate } from '@titicaca/router'

import { PoiListElement } from '../poi-list-elements'

import { ListingPoi } from './types'

export function PoiEntry({
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
  const trackEvent = useTrackEvent()
  const { navigate } = useNavigate()

  const handleIntersectionChange = useCallback(
    (inView: boolean) => {
      if (inView) {
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
    trackEvent({
      ga: ['근처추천장소_POI선택', `${eventLabel}_${index + 1}_${id}`],
      fa: {
        action: '근처추천장소_POI선택',
        label: `${eventLabel}_${index + 1}_${id}`,
      },
    })

    navigate(
      regionId ? `/regions/${regionId}/${type}s/${id}` : `/${type}s/${id}`,
    )
  }, [eventLabel, id, index, navigate, regionId, trackEvent, type])

  return (
    <List.Item key={id}>
      <InView onChange={handleIntersectionChange}>
        <PoiListElement
          as="div"
          poi={poi}
          onClick={handleClick}
          optimized={optimized}
        />
      </InView>
    </List.Item>
  )
}

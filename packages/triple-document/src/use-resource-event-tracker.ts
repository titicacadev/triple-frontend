import { useCallback } from 'react'
import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'

enum Resource {
  Region = 'region',
  Hotel = 'hotel',
  Restaurant = 'restaurant',
  Attraction = 'attraction',
}

function getObjectNamesProperty(source: unknown) {
  if (
    typeof source === 'object' &&
    source !== null &&
    Object.prototype.hasOwnProperty.call(source, 'names')
  ) {
    const { names } = source as { names: unknown }

    if (typeof names === 'object' && names !== null) {
      const { ko, en } = names as { ko?: unknown; en?: unknown }

      return ko || en
    }
  }
}

export default function useResourceEventTracker() {
  const trackEventWithMetadata = useEventTrackerWithMetadata()

  return useCallback(
    ({ id, type, source }: { id: string; type: string; source: unknown }) => {
      switch (type) {
        case Resource.Region:
          return trackEventWithMetadata({
            fa: {
              action: '도시선택',
              region_id: id,
              button_name: getObjectNamesProperty(source),
              content_type: type,
            },
          })

        case Resource.Hotel:
        case Resource.Restaurant:
        case Resource.Attraction:
          return trackEventWithMetadata({
            fa: {
              action: 'POI선택',
              item_id: id,
              button_name: getObjectNamesProperty(source),
              content_type: type,
            },
          })
        default:
          break
      }
    },
    [trackEventWithMetadata],
  )
}

import { useCallback } from 'react'
import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'

enum Resource {
  REGION = 'region',
  HOTEL = 'hotel',
  RESTAURANT = 'restaurant',
  ATTRACTION = 'attraction',
}

function getObjectNamesProperty(source: any) {
  if (Object.prototype.hasOwnProperty.call(source, 'names')) {
    return source.names.ko || source.names.en
  }
}

export default function useResourceEventTracker() {
  const trackEventWithMetadata = useEventTrackerWithMetadata()

  return useCallback(
    ({ id, type, source }: { id: string; type: string; source: unknown }) => {
      switch (type) {
        case Resource.REGION:
          return trackEventWithMetadata({
            fa: {
              action: '도시선택',
              region_id: id,
              button_name: getObjectNamesProperty(source),
              content_type: type,
            },
          })

        case Resource.HOTEL:
        case Resource.RESTAURANT:
        case Resource.ATTRACTION:
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

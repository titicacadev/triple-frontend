import { useEventTrackerWithMetadata } from '@titicaca/react-contexts'

export default function useResourceEventTracker() {
  const trackEventWithMetadata = useEventTrackerWithMetadata()

  return ({ id, type, source }: { id: string; type: string; source: any }) => {
    switch (type) {
      case 'region':
        return trackEventWithMetadata({
          fa: {
            action: '도시선택',
            region_id: id,
            button_name: source.names.ko || source.names.en,
            content_type: type,
          },
        })

      case 'hotel' || 'restaurant' || 'attraction':
        return trackEventWithMetadata({
          fa: {
            action: 'POI선택',
            item_id: id,
            button_name: source.names.ko,
            content_type: type,
          },
        })
    }
  }
}

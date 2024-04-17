import { FlexBox, MapMarkerIcon, Text } from '@titicaca/kint5-core-elements'
import { PoiType } from '@titicaca/content-type-definitions'

const BACKGROUND_COLOR_BY_TYPE = {
  attraction: '#1769FF',
  restaurant: '#FF6B00',
  hotel: '#1769FF',
  festa: '#EB147B',
}

export function ItineraryOrder({
  itineraryItemType,
  index,
}: {
  itineraryItemType: PoiType | 'festa' | null
  index: number
}) {
  return (
    <FlexBox flex css={{ position: 'relative' }}>
      <Text
        css={{
          position: 'absolute',
          top: 6,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--color-kint5-gray0)',
          fontSize: 12,
          fontWeight: 700,
        }}
      >
        {index + 1}
      </Text>
      <MapMarkerIcon
        color={BACKGROUND_COLOR_BY_TYPE[itineraryItemType ?? 'attraction']}
      />
    </FlexBox>
  )
}

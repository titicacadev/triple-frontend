import { FlexBox, MapMarkerIcon, Text } from '@titicaca/kint5-core-elements'
import { PoiType } from '@titicaca/content-type-definitions'

import { COLOR_PER_TYPE } from './constants'

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
        color={COLOR_PER_TYPE[itineraryItemType ?? 'attraction']}
      />
    </FlexBox>
  )
}

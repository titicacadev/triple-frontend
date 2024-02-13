import { ReactNode } from 'react'
import {
  FilledLocationIcon,
  FlexBox,
  Text,
} from '@titicaca/kint5-core-elements'

export default function AreaNames({
  areaName,
  regionName,
  arrowAction,
}: {
  areaName?: string
  regionName?: string
  arrowAction?: ReactNode
}) {
  return areaName || regionName ? (
    <FlexBox flex css={{ alignItems: 'center', marginTop: 12, gap: 4 }}>
      <FilledLocationIcon />
      <Text
        css={{
          fontSize: 13,
          color: 'var(--color-kint5-gray100)',
        }}
      >
        {areaName
          ? regionName
            ? `${areaName} (${regionName})`
            : areaName
          : regionName}
        {arrowAction}
      </Text>
    </FlexBox>
  ) : null
}

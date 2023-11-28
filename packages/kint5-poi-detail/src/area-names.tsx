import { ReactNode } from 'react'
import {
  FilledLocationIcon,
  FlexBox,
  Text,
} from '@titicaca/kint5-core-elements'

interface Area {
  id: number | string
  name: string
}

export default function AreaNames({
  areaName,
  areas = [],
  vicinity,
  arrowAction,
}: {
  areaName?: string
  areas?: Area[]
  vicinity?: string
  arrowAction?: ReactNode
}) {
  const names = areaName || areas[0]?.name || vicinity

  return names ? (
    <FlexBox flex css={{ alignItems: 'center', marginTop: 12, gap: 4 }}>
      <FilledLocationIcon />
      <Text
        css={{
          fontSize: 13,
          color: 'var(--color-kint5-gray60)',
        }}
      >
        {names}
        {arrowAction}
      </Text>
    </FlexBox>
  ) : null
}

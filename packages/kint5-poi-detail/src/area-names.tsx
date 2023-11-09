import { ReactNode } from 'react'
import styled from 'styled-components'
import { Container, Text } from '@titicaca/kint5-core-elements'

const AreaContainer = styled(Container)`
  padding-left: 16px;
  background-image: url('https://assets.triple-dev.titicaca-corp.com/images/kint5-location-1.svg');
  background-size: 12px 12px;
  background-repeat: no-repeat;
  background-position: left center;
`

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
    <AreaContainer>
      <Text css={{ fontSize: 13, fontWeight: 400, marginTop: 12 }}>
        {names}
        {arrowAction}
      </Text>
    </AreaContainer>
  ) : null
}

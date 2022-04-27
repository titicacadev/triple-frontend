import { ReactNode } from 'react'
import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'

const AreaContainer = styled(Container)`
  padding-left: 20px;
  background-image: url('https://assets.triple.guide/images/ico-end-location@3x.png');
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: left top;
`

export default function Area({
  areaName,
  arrowAction,
}: {
  areaName: string
  arrowAction?: ReactNode
}) {
  return (
    <AreaContainer>
      <Text size="tiny" bold margin={{ top: 10 }} alpha={0.8} lineHeight={1.38}>
        {areaName}
        {arrowAction}
      </Text>
    </AreaContainer>
  )
}

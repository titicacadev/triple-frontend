import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'

const AreaContainer = styled(Container)`
  padding-left: 20px;
  background-image: url('https://assets.triple.guide/images/ico-end-location@3x.png');
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: left top;
`

interface Area {
  id: number | string
  name: string
}

export default function AreaNames({
  areas,
  vicinity,
  arrowAction,
}: {
  areas: Area[]
  vicinity?: string
  arrowAction?: React.ReactNode
}) {
  const names = areas[0]?.name || vicinity

  return names ? (
    <AreaContainer>
      <Text size="tiny" bold margin={{ top: 10 }} alpha={0.8} lineHeight={1.38}>
        {names}
        {arrowAction}
      </Text>
    </AreaContainer>
  ) : null
}

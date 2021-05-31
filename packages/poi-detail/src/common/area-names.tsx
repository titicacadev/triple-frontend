import React from 'react'
import styled from 'styled-components'
import { Container, Text } from '@titicaca/core-elements'

import { ArrowButton } from './arrow-button'
import { PoiVersion } from './types'

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
  version = PoiVersion.V1,
  areas,
  vicinity,
  onClick,
}: {
  version?: PoiVersion
  areas: Area[]
  vicinity?: string
  onClick?: () => void
}) {
  const names = areas[0]?.name || vicinity

  return names ? (
    <AreaContainer>
      <Text size="tiny" bold margin={{ top: 10 }} alpha={0.8} lineHeight={1.38}>
        {names}
        {version === PoiVersion.V2 ? (
          <ArrowButton onClick={onClick}>지도보기</ArrowButton>
        ) : null}
      </Text>
    </AreaContainer>
  ) : null
}

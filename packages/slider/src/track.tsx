import React from 'react'
import styled, { StyledComponentProps } from 'styled-components'
import { blue } from '@titicaca/color-palette'

import Rail from './rail'

export const TrackContainer = styled.div.attrs<{ left: number; right: number }>(
  ({ left, right }) => ({
    style: {
      left: `${left}%`,
      right: `${100 - right}%`,
    },
  }),
)`
  position: absolute;
  padding: 20px 0;
  margin-top: -20px;
`

export default function Track({
  active,
  railHeight,
  ...rest
}: { active: boolean; railHeight?: number } & StyledComponentProps<
  'div',
  {},
  { left: number; right: number },
  never
>) {
  return (
    <TrackContainer {...rest}>
      {active ? <Rail active={active} railHeight={railHeight} /> : null}
    </TrackContainer>
  )
}

import React from 'react'
import styled, { StyledComponentProps } from 'styled-components'

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

export const ActiveTrack = styled.div`
  height: 3px;
  border-radius: 4px;
  background-color: #368fff;
  transform: translate(0, -50%);
`

export default function Track({
  active,
  ...rest
}: { active: boolean } & StyledComponentProps<
  'div',
  {},
  { left: number; right: number },
  never
>) {
  return (
    <TrackContainer {...rest}>{active ? <ActiveTrack /> : null}</TrackContainer>
  )
}
